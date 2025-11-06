const { check, param } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const prisma = require('../../prisma/client');

// PostgreSQL UUID kontrolü (MongoDB ObjectId yerine)
const isUUID = (value) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);
};

exports.createRoleValidator = [
  check('name')
    .notEmpty().withMessage('Role name is required')
    .isLength({ min: 2 }).withMessage('Role name must be at least 2 characters')
    .isLength({ max: 50 }).withMessage('Role name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Role name can only contain letters, numbers, and spaces')
    .custom(async (value) => {
      const role = await prisma.role.findUnique({
        where: { name: value }
      });
      if (role) {
        throw new Error('Role name already exists');
      }
      return true;
    }),

  check('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  // Skills artık zorunlu DEĞİL - one-to-many ilişkisi için
  check('skills')
    .optional() // Zorunlu olmaktan çıktı
    .isArray().withMessage('Skills must be an array'),

  // Skills array içindeki ID'leri kontrol et (optional)
  check('skills.*')
    .optional()
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format - must be UUID');
      }
      return true;
    }),

  // Skills'in var olup olmadığını kontrol et (optional)
  check('skills').custom(async (skills) => {
    if (skills && skills.length > 0) {
      const existingSkills = await prisma.skill.findMany({
        where: {
          id: { in: skills }
        }
      });
      
      if (existingSkills.length !== skills.length) {
        const existingSkillIds = existingSkills.map(skill => skill.id);
        const missingSkills = skills.filter(skillId => !existingSkillIds.includes(skillId));
        throw new Error(`Some skills not found: ${missingSkills.join(', ')}`);
      }
    }
    return true;
  }),

  validatorMiddleware,
];

exports.getRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format - must be UUID');
      }
      return true;
    }),
  validatorMiddleware,
];

exports.updateRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format - must be UUID');
      }
      return true;
    }),

  check('name')
    .optional()
    .isLength({ min: 2 }).withMessage('Role name must be at least 2 characters')
    .isLength({ max: 50 }).withMessage('Role name cannot exceed 50 characters')
    .matches(/^[a-zA-Z0-9\s]+$/).withMessage('Role name can only contain letters, numbers, and spaces')
    .custom(async (value, { req }) => {
      if (value) {
        const role = await prisma.role.findUnique({
          where: { name: value }
        });
        if (role && role.id !== req.params.id) {
          throw new Error('Role name already exists');
        }
      }
      return true;
    }),

  check('description')
    .optional()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),

  check('skills')
    .optional()
    .isArray().withMessage('Skills must be an array'),

  // Skills array içindeki ID'leri kontrol et (optional)
  check('skills.*')
    .optional()
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format - must be UUID');
      }
      return true;
    }),

  // Skills'in var olup olmadığını kontrol et (optional)
  check('skills').custom(async (skills, { req }) => {
    if (skills && skills.length > 0) {
      const existingSkills = await prisma.skill.findMany({
        where: {
          id: { in: skills }
        }
      });
      
      if (existingSkills.length !== skills.length) {
        const existingSkillIds = existingSkills.map(skill => skill.id);
        const missingSkills = skills.filter(skillId => !existingSkillIds.includes(skillId));
        throw new Error(`Some skills not found: ${missingSkills.join(', ')}`);
      }
    }
    return true;
  }),

  validatorMiddleware,
];

exports.deleteRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format - must be UUID');
      }
      return true;
    }),
  validatorMiddleware,
];

// Yeni eklenen validatörler - one-to-many ilişkisi için
exports.addSkillToRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format - must be UUID');
      }
      return true;
    }),

  check('skillId')
    .notEmpty().withMessage('Skill ID is required')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format - must be UUID');
      }
      return true;
    })
    .custom(async (value) => {
      const skill = await prisma.skill.findUnique({
        where: { id: value }
      });
      if (!skill) {
        throw new Error('Skill not found');
      }
      return true;
    }),

  validatorMiddleware,
];

exports.removeSkillFromRoleValidator = [
  param('id')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid role ID format - must be UUID');
      }
      return true;
    }),

  param('skillId')
    .custom((value) => {
      if (!isUUID(value)) {
        throw new Error('Invalid skill ID format - must be UUID');
      }
      return true;
    })
    .custom(async (value, { req }) => {
      const skill = await prisma.skill.findUnique({
        where: { id: value }
      });
      if (!skill) {
        throw new Error('Skill not found');
      }
      
      // Skill'in bu role'e ait olup olmadığını kontrol et
      if (skill.roleId !== req.params.id) {
        throw new Error('This skill does not belong to the specified role');
      }
      
      return true;
    }),

  validatorMiddleware,
];