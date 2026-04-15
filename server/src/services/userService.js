// const slugify = require('slugify');
const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const bcrypt = require('bcryptjs');
const { sendVerificationCode, generateVerificationCode } = require('./emailService.js');
const prisma = require('../../prisma/client.js');

// @desc    Register user
// @route   POST /api/v1/user
// @access  Public
exports.registerUser = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
  });

  if (existingUser) {
    return next(new ApiError('User already exists with this email', 400));
  }

  // 2) Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3) Generate 6-digit verification CODE (OTP)
  const verificationCode = generateVerificationCode();
  const verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 dakika

  // // 4) Find or create default role
  // let defaultRole = await prisma.role.findFirst({
  //   where: { name: 'user' }
  // });
  //
  // if (!defaultRole) {
  //   defaultRole = await prisma.role.create({
  //     data: {
  //       name: 'user',
  //       description: 'Default user role'
  //     }
  //   });
  // }
  //
  // 5) Create user with Prisma - store CODE instead of token
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      emailVerificationCode: verificationCode,      // 6 haneli kod
      emailVerificationExpires: verificationExpires,
      isVerified: false,
    }
  });

  // 6) Generate token (user not verified yet)
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isVerified: false,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  // 7) Send verification CODE via email
  await sendVerificationCode({
    email: user.email,
    code: verificationCode,  // 6 haneli kod gönder
  });

  // 8) Set cookie
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
  };

  if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie('token', token, cookieOptions);

  // 9) Remove password from response
  const { password: _, emailVerificationCode: __, ...userWithoutPassword } = user;

  res.status(201).json({
    status: 'success',
    message: 'Registration successful! Please check your email for the 6-digit verification code.',
    data: {
      user: {
        ...userWithoutPassword,
      }
    }
  });
  if (process.env.NODE_ENV === 'development') {
    console.log('New user registered:', user.email);
    console.log('Verification code:', verificationCode);
  }// Development için
});

// @desc    Verify email with 6-digit code
// @route   POST /api/v1/user/verify-email
// @access  Private
exports.verifyEmail = asynchandler(async (req, res, next) => {
  const code = req.body.verificationCode;
  const userId = req.user.id; // JWT'den gelen user ID

  // Kullanıcıyı bul
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  if (user.isVerified) {
    return next(new ApiError('Email already verified', 400));
  }
  // Kod kontrolü
  const codeStr = String(code).trim();
  const dbCodeStr = String(user.emailVerificationCode).trim();

  if (dbCodeStr !== codeStr) {
    return next(new ApiError('Invalid verification code', 400));
  }

  // Süre kontrolü
  if (new Date() > user.emailVerificationExpires) {
    return next(new ApiError('Verification code has expired', 400));
  }

  // Doğrulama başarılı - güncelle
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      emailVerificationCode: null, // Kodu temizle
      emailVerificationExpires: null
    }
  });

  // Yeni token oluştur (verified=true)
  const newToken = jwt.sign(
    {
      id: updatedUser.id,
      email: updatedUser.email,
      isVerified: true,
      role: req.user.role
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  // Cookie'yi güncelle
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
  };

  if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie('token', newToken, cookieOptions);

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully',
    data: {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isVerified: true
      }
    }
  });
});

// @desc    Resend verification code
// @route   POST /api/v1/user/resend-code
// @access  Private
exports.resendVerificationCode = asynchandler(async (req, res, next) => {
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  if (user.isVerified) {
    return next(new ApiError('Email already verified', 400));
  }

  // Yeni kod üret
  const newCode = generateVerificationCode();
  const newExpires = new Date(Date.now() + 10 * 60 * 1000);

  // Güncelle
  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationCode: newCode,
      emailVerificationExpires: newExpires
    }
  });

  // Tekrar gönder
  await sendVerificationCode({
    email: user.email,
    code: newCode,
  });

  res.status(200).json({
    status: 'success',
    message: 'New verification code sent to your email'
  });
});


exports.logoutUser = asynchandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('User logged out:', req.user.email);
  }
});

exports.changePassword = asynchandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isCurrentPasswordValid) {
    return next(new ApiError('Current password is incorrect', 401));
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: hashedNewPassword
    }
  });

  res.status(200).json({
    status: 'success',
    message: 'Password changed successfully'
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('User password changed:', user.email);
  }
});
//
// // @desc    Login user
exports.loginUser = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError('Please provide email and password', 400));
  }

  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!user) {
    return next(new ApiError('Incorrect email or password', 401));
  }

  if (!user.isVerified) {
    return next(new ApiError('Please verify your email address before logging in', 403));
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return next(new ApiError('Incorrect email or password', 401));
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
      role: user.role
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
  };

  if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
    cookieOptions.domain = process.env.COOKIE_DOMAIN;
  }

  res.cookie('token', token, cookieOptions);

  const { passwordHash: _, ...userWithoutPassword } = user;

  res.status(200).json({
    status: 'success',
    data: { user: userWithoutPassword }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('User logged in:', user.email);
  }
});
//
//   // 1) Check if email and password exist
//   if (!email || !password) {
//     return next(new ApiError('Please provide email and password', 400));
//   }
//
//   // 2) Find user with Prisma
//   const user = await prisma.user.findUnique({
//     where: { email: email }
//   });
//
//   if (!user) {
//     return next(new ApiError('Incorrect email or password', 401));
//   }
//
//   // 3) Check if email is verified
//   if (!user.isEmailVerified) {
//     return next(new ApiError('Please verify your email address before logging in', 403));
//   }
//
//   // 3) Check password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return next(new ApiError('Incorrect email or password', 401));
//   }
//
//   // 4) Generate token
//   const token = jwt.sign(
//     { id: user.id, email: user.email, name: user.name },
//     config.JWT_SECRET,
//     { expiresIn: config.JWT_EXPIRES_IN }
//   );
//
//   // 5) Remove password from output
//   const { password: _, ...userWithoutPassword } = user;
//
//   // 6) Set cookie
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     domain: process.env.COOKIE_DOMAIN,
//     maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//   });
//
//   res.status(200).json({
//     status: 'success',
//     data: { user: userWithoutPassword }
//   });
//   console.log('User logged in:', user.email);
// });
//
//
//
// // @desc    Verify email
// // @route   GET /api/v1/user/verify-email/:token
// // @access  Public
// exports.verifyEmail = asynchandler(async (req, res, next) => {
//   const { token } = req.params;
//
//   // 1) Find user with valid token
//   const user = await prisma.user.findFirst({
//     where: {
//       emailVerificationToken: token,
//       emailVerificationExpires: {
//         gt: new Date()
//       }
//     }
//   });
//
//   if (!user) {
//     return next(new ApiError('The verification token is invalid or expired', 400));
//   }
//
//   // 2) Update user
//   const updatedUser = await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       isEmailVerified: true,
//       emailVerificationToken: null,
//       emailVerificationExpires: null
//     }
//   });
//
//   // 3) Generate new token
//   const newToken = jwt.sign(
//     { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name, isVerified: true },
//     config.JWT_SECRET,
//     { expiresIn: config.JWT_EXPIRES_IN }
//   );
//
//   // 4) Set cookie
//   res.cookie('token', newToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     domain: process.env.COOKIE_DOMAIN,
//     maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//   });
//
//   // 5) Remove password from response
//   const { password: _, ...userWithoutPassword } = updatedUser;
//
//   res.status(200).json({
//     status: 'success',
//     message: 'Email verified successfully!',
//     data: { user: userWithoutPassword }
//   });
//   console.log('User email verified:', updatedUser.email);
// });
//
// // @desc    Resend verification email
// // @route   POST /api/v1/user/resend-verification
// // @access  Public
// exports.resendVerificationEmail = asynchandler(async (req, res, next) => {
//   const { email } = req.body;
//
//   // 1) Find user
//   const user = await prisma.user.findUnique({
//     where: { email: email }
//   });
//
//   if (!user) {
//     return next(new ApiError('No user found with this email', 404));
//   }
//
//   if (user.isEmailVerified) {
//     return next(new ApiError('This email address has already been verified', 400));
//   }
//
//   // 2) Generate new verification token
//   const verificationToken = generateVerificationToken();
//   const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
//
//   // 3) Update user
//   await prisma.user.update({
//     where: { id: user.id },
//     data: {
//       emailVerificationToken: verificationToken,
//       emailVerificationExpires: verificationExpires
//     }
//   });
//
//   // 4) Send email
//   await sendVerificationEmail({
//     email: user.email,
//     token: verificationToken,
//     userName: user.name,
//     userAgent: req.headers['user-agent'], // Dark mode tespiti için
//     userPreferences: {
//       darkMode: true // Kullanıcı tercihine göre
//     }
//   });
//   res.status(200).json({
//     status: 'success',
//     message: 'Verification email sent successfully'
//   });
//   console.log('Verification email resent to:', user.email);
// });
//
//
//
// // @desc    Get user profile
// // @route   GET /api/v1/user/profile
// // @access  Private
// exports.getUserProfile = asynchandler(async (req, res, next) => {
//   const user = await prisma.user.findUnique({
//     where: { id: req.user.id }
//   });
//
//   if (!user) {
//     return next(new ApiError('User not found', 404));
//   }
//
//   // Remove password from response
//   const { password: _, ...userWithoutPassword } = user;
//
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: userWithoutPassword
//     }
//   });
//   console.log('User profile retrieved:', user.email);
// });
//
// // @desc    Logout user
// // @route   POST /api/v1/user/logout
// // @access  Private
// exports.logoutUser = asynchandler(async (req, res) => {
//   res.clearCookie('token');
//   res.status(200).json({
//     status: 'success',
//     message: 'Logged out successfully'
//   });
//   console.log('User logged out:', req.user.email);
// });
//
// // @desc    Update user profile
// // @route   PUT /api/v1/user/profile
// // @access  Private
// exports.updateUserProfile = asynchandler(async (req, res, next) => {
//   const updateData = {
//     name: req.body.name,
//     slug: slugify(req.body.name, { lower: true })
//   };
//
//   // If email is being updated, add it to update data and reset verification
//   if (req.body.email && req.body.email !== req.user.email) {
//     updateData.email = req.body.email;
//     updateData.isEmailVerified = false;
//
//     const verificationToken = generateVerificationToken();
//     updateData.emailVerificationToken = verificationToken;
//     updateData.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
//
//     // Send verification email for new email
//     // 5) Send verification email
//     await sendVerificationEmail({
//       email: user.email,
//       token: verificationToken,
//       userName: user.name,
//       userAgent: req.headers['user-agent'], // Dark mode tespiti için
//       userPreferences: {
//         darkMode: true // Kullanıcı tercihine göre
//       }
//     });
//
//   }
//
//   // Update user
//   const updatedUser = await prisma.user.update({
//     where: { id: req.user.id },
//     data: updateData
//   });
//
//   // Generate new token
//   const token = jwt.sign(
//     { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name },
//     config.JWT_SECRET,
//     { expiresIn: config.JWT_EXPIRES_IN }
//   );
//
//
//   // Update cookie
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     domain: process.env.COOKIE_DOMAIN,
//     maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//   });
//
//   // Remove password from response
//   const { password: _, ...userWithoutPassword } = updatedUser;
//
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: userWithoutPassword
//     }
//   });
//   console.log('User profile updated:', updatedUser.email);
// });
//
//
//
//
// // @desc    Check authentication
// // @route   GET /api/v1/user/check-auth
// // @access  Private
// exports.checkAuth = asynchandler(async (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       user: req.user
//     }
//   });
//   console.log('Authentication check successful for:', req.user.email);
// });
//
// // @desc    Change user password with security timestamp
// // @route   PUT /api/v1/user/change-password
// // @access  Private
// exports.changePassword = asynchandler(async (req, res, next) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user.id;
//
//   // 1) Get user with password
//   const user = await prisma.user.findUnique({
//     where: { id: userId }
//   });
//
//   if (!user) {
//     return next(new ApiError('User not found', 404));
//   }
//
//   // 2) Check current password
//   const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
//   if (!isCurrentPasswordValid) {
//     return next(new ApiError('Current password is incorrect', 401));
//   }
//
//   // 3) Hash new password
//   const hashedNewPassword = await bcrypt.hash(newPassword, 10);
//
//   // 4) Update password with timestamp (1 second earlier for safety)
//   const updatedUser = await prisma.user.update({
//     where: { id: userId },
//     data: {
//       password: hashedNewPassword,
//       passwordChangedAt: new Date(Date.now() - 1000) // 1 saniye öncesi
//     }
//   });
//
//   // 5) Generate new token (important: old tokens will be invalidated)
//   const token = jwt.sign(
//     { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name },
//     config.JWT_SECRET,
//     { expiresIn: config.JWT_EXPIRES_IN }
//   );
//
//   // 6) Update cookie
//   res.cookie('token', token, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     domain: process.env.COOKIE_DOMAIN,
//     maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//   });
//
//   res.status(200).json({
//     status: 'success',
//     message: 'Password changed successfully'
//   });
//   console.log('User password changed:', updatedUser.email);
// });
//
// @desc    Logout user
// @route   POST /api/v1/user/logout
// @access  Private
