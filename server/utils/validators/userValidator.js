const { check, param, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const prisma = require('../../prisma/client');

// MongoDB ObjectId kontrolü
const isObjectId = (value) => {
  return /^[0-9a-fA-F]{24}$/.test(value);
};

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
      const user = await prisma.user.findUnique({
        where: { email: value }
      });
      if (user) {
        throw new Error('Email already in use');
      }
    }),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  validatorMiddleware,
];

exports.updateUserValidator = [
  param('id')
    .custom((value) => {
      if (!isObjectId(value)) {
        throw new Error('Invalid user ID format');
      }
      return true;
    }),

  check('name')
    .optional()
    .isLength({ min: 3, max: 32 })
    .withMessage('Name must be between 3 to 32 characters'),

  check('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email')
    .custom(async (value, { req }) => {
      const user = await prisma.user.findUnique({
        where: { email: value }
      });
      if (user && user.id.toString() !== req.params.id) {
        throw new Error('Email already in use');
      }
      return true;
    }),

  validatorMiddleware,
];

exports.getUserValidator = [
  param('id')
    .custom((value) => {
      if (!isObjectId(value)) {
        throw new Error('Invalid user ID format');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  param('id')
    .custom((value) => {
      if (!isObjectId(value)) {
        throw new Error('Invalid user ID format');
      }
      return true;
    }),
  validatorMiddleware,
];


exports.changePasswordValidator = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .not()
    .isIn(['123456', 'password'])
    .withMessage('Do not use common passwords'),
  validatorMiddleware,
];
