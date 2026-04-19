const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const bcrypt = require('bcryptjs');
const { sendVerificationCode, generateVerificationCode, sendPasswordResetEmail } = require('./emailService.js');
const prisma = require('../../prisma/client.js');

exports.register = asynchandler(async (email, password) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: email }
  });

  if (existingUser) {
    return next(new ApiError('User already exists with this email', 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationCode = generateVerificationCode();
  const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpires,
      isVerified: false,
    }
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isVerified: false,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  await sendVerificationCode({
    email: user.email,
    code: verificationCode,
  });

  const { passwordHash, emailVerificationCode, ...rest } = user;
  const userWithoutPassword = { ...rest, passwordHash: undefined, emailVerificationCode: undefined };

  if (process.env.NODE_ENV === 'development') {
    console.log('New user registered:', user.email);
    console.log('Verification code:', verificationCode);
  }

  return {
    status: 'success',
    message: 'Registration successful! Please check your email for the 6-digit verification code.',
    data: { user: userWithoutPassword },
    token: token
  };
});

exports.verifyEmail = asynchandler(async (userId, code) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  if (user.isVerified) {
    throw new ApiError('Email already verified', 400);
  }

  const codeStr = String(code).trim();
  const dbCodeStr = String(user.emailVerificationCode).trim();

  if (dbCodeStr !== codeStr) {
    throw new ApiError('Invalid verification code', 400);
  }

  if (new Date() > user.emailVerificationExpires) {
    throw new ApiError('Verification code has expired', 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      emailVerificationCode: null,
      emailVerificationExpires: null
    }
  });

  const newToken = jwt.sign(
    {
      id: updatedUser.id,
      email: updatedUser.email,
      isVerified: true,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  return {
    status: 'success',
    message: 'Email verified successfully',
    token: newToken,
    data: {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isVerified: true
      }
    }
  };
});

exports.resendCode = asynchandler(async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  if (user.isVerified) {
    throw new ApiError('Email already verified', 400);
  }

  const newCode = generateVerificationCode();
  const newExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationCode: newCode,
      emailVerificationExpires: newExpires
    }
  });

  await sendVerificationCode({
    email: user.email,
    code: newCode,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Verification code resent:', user.email);
    console.log('New code:', newCode);
  }

  return {
    status: 'success',
    message: 'New verification code sent to your email'
  };
});

exports.login = asynchandler(async (email, password) => {
  if (!email || !password) {
    throw new ApiError('Please provide email and password', 400);
  }

  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!user) {
    throw new ApiError('Incorrect email or password', 401);
  }

  if (!user.isVerified) {
    throw new ApiError('Please verify your email address before logging in', 403);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError('Incorrect email or password', 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN }
  );

  const { passwordHash, emailVerificationCode, ...rest } = user;
  const userWithoutPassword = { ...rest, passwordHash: undefined, emailVerificationCode: undefined };

  if (process.env.NODE_ENV === 'development') {
    console.log('User logged in:', user.email);
  }

  return {
    status: 'success',
    massage: 'Login successful',
    token: token,
    data: { user: userWithoutPassword }
  };
});

exports.logout = asynchandler(async (req, res) => {
  res.clearCookie('token');

  if (process.env.NODE_ENV === 'development') {
    console.log('User logged out:', req.user.email);
  }

  return {
    status: 'success',
    message: 'Logged out successfully'
  };
});

exports.forgotPassword = asynchandler(async (email) => {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!user) {
    throw new ApiError('If the email exists, a reset code will be sent', 200);
  }

  if (!user.isVerified) {
    throw new ApiError('Please verify your email first', 400);
  }

  const resetCode = generateVerificationCode();
  const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetCode: resetCode,
      passwordResetExpires: resetExpires
    }
  });

  await sendPasswordResetEmail({
    email: user.email,
    code: resetCode
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Password reset requested:', user.email);
    console.log('Reset code:', resetCode);
  }

  return {
    status: 'success',
    message: 'Password reset code sent to your email'
  };
});

exports.resetPassword = asynchandler(async (email, code, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { email: email }
  });

  if (!user) {
    throw new ApiError('Invalid reset request', 400);
  }

  if (!user.passwordResetCode || !user.passwordResetExpires) {
    throw new ApiError('Invalid reset request', 400);
  }

  if (new Date() > user.passwordResetExpires) {
    throw new ApiError('Reset code has expired. Please request a new one.', 400);
  }

  const codeStr = String(code).trim();
  const dbCodeStr = String(user.passwordResetCode).trim();

  if (dbCodeStr !== codeStr) {
    throw new ApiError('Invalid reset code', 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashedPassword,
      passwordResetCode: null,
      passwordResetExpires: null
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Password reset successful:', user.email);
  }

  return {
    status: 'success',
    message: 'Password reset successful. You can now login with your new password.'
  };
});
