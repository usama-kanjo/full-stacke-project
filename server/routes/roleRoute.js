const express = require('express');
const {
  createRole,
  getAllRoles,
  getRole,
  updateRole,
  deleteRole,
  addSkillToRole,
  removeSkillFromRole,
  getRolesWithSkillCount,
  searchRoles
} = require('../services/roleService');
const {
  createRoleValidator,
  updateRoleValidator,
  getRoleValidator,
  deleteRoleValidator,
  addSkillToRoleValidator,
  removeSkillFromRoleValidator
} = require('../utils/validators/roleValidator');

const router = express.Router();

router.route('/')
  .post(createRoleValidator, createRole)
  .get(getAllRoles);

router.route('/stats/count')
  .get(getRolesWithSkillCount);

router.route('/search')
  .get(searchRoles);

router.route('/:id')
  .get(getRoleValidator, getRole)
  .patch(updateRoleValidator, updateRole)
  .delete(deleteRoleValidator, deleteRole);

router.route('/:id/skills')
  .post(addSkillToRoleValidator, addSkillToRole);

router.route('/:id/skills/:skillId')
  .delete(removeSkillFromRoleValidator, removeSkillFromRole);

module.exports = router;
