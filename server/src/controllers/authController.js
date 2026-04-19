const authService = require('../services/authService');
const userService = require('../services/userService');
const config = require('../config/jwt');

exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.register(email, password);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    };
    if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }
    res.cookie('token', result.token, cookieOptions);

    res.status(201).json({
      status: result.status,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: config.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    };
    if (process.env.NODE_ENV === 'production' && process.env.COOKIE_DOMAIN) {
      cookieOptions.domain = process.env.COOKIE_DOMAIN;
    }
    res.cookie('token', result.token, cookieOptions);

    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;
    const result = await authService.verifyEmail(req.user.id, verificationCode);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 90 * 24 * 60 * 60 * 1000
    };
    res.cookie('token', result.token, cookieOptions);

    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

exports.resendCode = async (req, res, next) => {
  try {
    const result = await authService.resendCode(req.user.id);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const result = await authService.logout(req, res);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword(email);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { email, code, newPassword } = req.body;
    const result = await authService.resetPassword(email, code, newPassword);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};
