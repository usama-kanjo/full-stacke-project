const { check, param, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
// const prisma = require('../../../prisma/client');

// ✅ PostgreSQL için integer ID validatörü
const isIntegerId = (value) => {
  const num = parseInt(value);
  return Number.isInteger(num) && num > 0;
};

exports.loginUserValidator = [
  check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  validatorMiddleware,
];

exports.createUserValidator = [
  check('email')
    .trim()
    .normalizeEmail()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  // .custom(async (value) => {
  //   const existing = await prisma.user.findUnique({ where: { email: value } });
  //   if (existing) throw new Error('Email already registered');
  //   return true;
  // }),
  check('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number'),
  validatorMiddleware,
];

exports.updateUserValidator = [
  param('id')
    .custom((value) => {
      if (!isIntegerId(value)) {
        throw new Error('Invalid user ID format');
      }
      return true;
    }),
  check('email')
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail().withMessage('Please provide a valid email'),
  // .custom(async (value, { req }) => {
  //   const existing = await prisma.user.findUnique({ where: { email: value } });
  //   if (existing && existing.id !== parseInt(req.params.id)) {
  //     throw new Error('Email already in use');
  //   }
  //   return true;
  // }),
  validatorMiddleware,
];

exports.getUserValidator = [
  param('id').custom((value) => {
    if (!isIntegerId(value)) throw new Error('Invalid user ID format');
    return true;
  }),
  validatorMiddleware,
];

exports.deleteUserValidator = [
  param('id').custom((value) => {
    if (!isIntegerId(value)) throw new Error('Invalid user ID format');
    return true;
  }),
  validatorMiddleware,
];

exports.changePasswordValidator = [
  check('currentPassword')
    .notEmpty().withMessage('Current password is required'),
  check('newPassword')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('New password must contain uppercase letter')
    .matches(/[0-9]/).withMessage('New password must contain a number'),
  validatorMiddleware,
];
