const express = require('express');
const {
  createSkill,
  getAllSkills,
  getSkill,
  updateSkill,
  deleteSkill,
  getSkillsByRole,
  assignSkillToRole,
  removeSkillFromRole,
  getUnassignedSkills
} = require('../services/skillService');
const {
  createSkillValidator,
  updateSkillValidator,
  getSkillValidator,
  deleteSkillValidator,
  getSkillsByRoleValidator,
  assignSkillToRoleValidator,
  removeSkillFromRoleValidator
} = require('../utils/validators/skillValidator');

const router = express.Router();

router.route('/')
  .post(createSkillValidator, createSkill)
  .get(getAllSkills);

router.route('/unassigned')
  .get(getUnassignedSkills);

router.route('/role/:roleId')
  .get(getSkillsByRoleValidator, getSkillsByRole);

router.route('/:id')
  .get(getSkillValidator, getSkill)
  .patch(updateSkillValidator, updateSkill)
  .delete(deleteSkillValidator, deleteSkill);

router.route('/:id/assign')
  .patch(assignSkillToRoleValidator, assignSkillToRole);

router.route('/:id/remove-role')
  .patch(removeSkillFromRoleValidator, removeSkillFromRole);

module.exports = router;
