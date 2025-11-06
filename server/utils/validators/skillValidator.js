const { check, param } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const prisma = require('../../prisma/client');

// UUID v4 kontrolü - PRISMA/POSTGRESQL İÇİN
const isUUID = (value) => {
  if (!value) return true; // Null/undefined değerlere izin ver
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
};

exports.createSkillValidator = [
  check('name')
    .notEmpty().withMessage('Skill name is required')
    .isLength({ min: 2 }).withMessage('Skill name must be at least 2 characters')
    .isLength({ max: 50 }).withMessage('Skill name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/).withMessage('Skill name can only contain letters, numbers, spaces, hyphens and underscores')
    .custom(async (value) => {
      const skill = await prisma.skill.findUnique({
        where: { name: value.toLowerCase() } // Case-insensitive kontrol
      });
      if (skill) {
        throw new Error('Skill name already exists');
      }
      return true;
    }),

  check('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  // One-to-many ilişkisi için roleId kontrolü (optional)
  check('roleId')
    .optional()
    .custom((value) => {
      if (value && !isUUID(value)) {
        throw new Error('Invalid role ID format');
      }
      return true;
    })
    .custom(async (value) => {
      if (value) {
        const role = await prisma.role.findUnique({
          where: { id: value }
        });
        if (!role) {
          throw new Error('Role not found');
        }
      }
      return true;
    }),

  validatorMiddleware,
];

exports.updateSkillValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format');
      }
      return true;
    }),

  check('name')
    .optional()
    .isLength({ min: 2 }).withMessage('Skill name must be at least 2 characters')
    .isLength({ max: 50 }).withMessage('Skill name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s\-_]+$/).withMessage('Skill name can only contain letters, numbers, spaces, hyphens and underscores')
    .custom(async (value, { req }) => {
      if (value) {
        const skill = await prisma.skill.findUnique({
          where: { name: value.toLowerCase() }
        });
        // UUID karşılaştırması
        if (skill && skill.id !== req.params.id) {
          throw new Error('Skill name already exists');
        }
      }
      return true;
    }),

  check('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  // One-to-many ilişkisi için roleId kontrolü (optional)
  check('roleId')
    .optional()
    .custom((value) => {
      if (value === null) return true; // Null değere izin ver
      if (value && !isUUID(value)) {
        throw new Error('Invalid role ID format');
      }
      return true;
    })
    .custom(async (value, { req }) => {
      if (value) {
        const role = await prisma.role.findUnique({
          where: { id: value }
        });
        if (!role) {
          throw new Error('Role not found');
        }
      }
      return true;
    }),

  validatorMiddleware,
];

exports.getSkillValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.deleteSkillValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format');
      }
      return true;
    }),
  validatorMiddleware,
];

// Yeni eklenen validatörler - one-to-many ilişkisi için
exports.getSkillsByRoleValidator = [
  param('roleId')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format');
      }
      return true;
    })
    .custom(async (value) => {
      const role = await prisma.role.findUnique({
        where: { id: value }
      });
      if (!role) {
        throw new Error('Role not found');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.assignSkillToRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format');
      }
      return true;
    }),

  check('roleId')
    .notEmpty().withMessage('Role ID is required')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format');
      }
      return true;
    })
    .custom(async (value) => {
      const role = await prisma.role.findUnique({
        where: { id: value }
      });
      if (!role) {
        throw new Error('Role not found');
      }
      return true;
    }),

  validatorMiddleware,
];

exports.removeSkillFromRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format');
      }
      return true;
    }),

  check('roleId')
    .optional() // Silme işleminde gerekli olmayabilir
    .custom((value) => {
      if (value && !isUUID(value)) {
        throw new Error('Invalid role ID format');
      }
      return true;
    }),

  validatorMiddleware,
];