const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const User = require('../../models/userModel');

exports.loginUserValidator = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validatorMiddleware,
];

exports.createUserValidator = [
  check('name')
    .notEmpty().withMessage('User name is required')
    .isLength({ min: 3 }).withMessage('User name must be at least 3 characters')
    .isLength({ max: 32 }).withMessage('User name must be at most 32 characters'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email already in use');
      }
    }),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
  // .withMessage('Password must contain at least one uppercase letter, one lowercase letter and one number'),

  validatorMiddleware,
];
