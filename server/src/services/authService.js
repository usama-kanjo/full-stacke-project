const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const jwt = require('jsonwebtoken');
const config = require('../config/jwt');
const bcrypt = require('bcryptjs');
const { sendVerificationCode, generateVerificationCode } = require('./emailService.js');
const prisma = require('../../prisma/client.js');

exports.register = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

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

  const { password: _, emailVerificationCode: __, ...userWithoutPassword } = user;

  if (process.env.NODE_ENV === 'development') {
    console.log('New user registered:', user.email);
    console.log('Verification code:', verificationCode);
  }

  return {
    status: 'success',
    message: 'Registration successful! Please check your email for the 6-digit verification code.',
    data: { user: userWithoutPassword }
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

exports.login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

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

  if (process.env.NODE_ENV === 'development') {
    console.log('User logged in:', user.email);
  }

  return {
    status: 'success',
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
