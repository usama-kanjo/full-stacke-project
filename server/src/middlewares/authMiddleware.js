// authMiddleware.js
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/apiError');
const asyncHandler = require('express-async-handler');
const config = require('../config/jwt');
const prisma = require('../../prisma/client'); // Doğru path
// const userService = require('../services/userService');

exports.protect = asyncHandler(async (req, res, next) => {
  // 1) Getting token and check if it's there
  let token;

  // Check for token in cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Check for token in authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new ApiError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verify token - BÜYÜK HARF ile (config.JWT_SECRET)
  const decoded = jwt.verify(token, config.JWT_SECRET); // BÜYÜK HARF

  // 3) Check if user still exists - PRISMA İLE
  const currentUser = await prisma.user.findUnique({
    where: { id: decoded.id }
  });

  if (!currentUser) {
    return next(
      new ApiError('The user belonging to this token no longer exists.', 401)
    );
  }

  if (!currentUser.isVerified) {
    return next(
      new ApiError('Please verify your email address to activate your account.', 403)
    );
  }


  // 6) Remove password from user object
  const { password: _, ...userWithoutPassword } = currentUser;

  // 7) Grant access to protected route
  req.user = userWithoutPassword;
  next();
});

exports.softProtect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new ApiError('You are not logged in! Please log in to get access.', 401)
    );
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id }
    });

    if (currentUser) {
      const { password: _, ...userWithoutPassword } = currentUser;
      req.user = userWithoutPassword;
    }
  } catch (err) {
  }

  next();
});



