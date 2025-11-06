const asyncHandler = require('express-async-handler');
const prisma = require('../prisma/client');
const ApiError = require('../utils/apiError');

// @desc    Create new skill
// @route   POST /api/v1/skills
// @access  Private/Admin
exports.createSkill = asyncHandler(async (req, res, next) => {
  const { name, description, roleId } = req.body;

  // Check if skill with this name already exists
  const existingSkill = await prisma.skill.findUnique({
    where: { name }
  });

  if (existingSkill) {
    return next(new ApiError('Skill with this name already exists', 400));
  }

  // Eğer roleId verilmişse, role'ün var olup olmadığını kontrol et
  if (roleId) {
    const role = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!role) {
      return next(new ApiError('Role not found', 404));
    }
  }

  const skill = await prisma.skill.create({
    data: {
      name,
      description,
      roleId: roleId || null
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      skill
    }
  });
  console.log('New skill created:', name);
});

// @desc    Get all skills (with pagination)
// @route   GET /api/v1/skills
// @access  Public
exports.getAllSkills = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const total = await prisma.skill.count();

  const skills = await prisma.skill.findMany({
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    results: skills.length,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    },
    data: {
      skills
    }
  });
});

// @desc    Get single skill
// @route   GET /api/v1/skills/:id
// @access  Public
exports.getSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await prisma.skill.findUnique({
    where: { id },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  if (!skill) {
    return next(new ApiError(`No skill found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      skill
    }
  });
});

// @desc    Update skill
// @route   PATCH /api/v1/skills/:id
// @access  Private/Admin
exports.updateSkill = asyncHandler(async (req, res, next) => {
  const { name, description, roleId } = req.body;

  const existingSkill = await prisma.skill.findUnique({
    where: { id: req.params.id }
  });

  if (!existingSkill) {
    return next(new ApiError(`No skill found with id: ${req.params.id}`, 404));
  }

  // Check if name is being updated to an existing name
  if (name && name !== existingSkill.name) {
    const skillWithSameName = await prisma.skill.findUnique({
      where: { name }
    });

    if (skillWithSameName) {
      return next(new ApiError('Skill with this name already exists', 400));
    }
  }

  // Eğer roleId değiştiyse, yeni role'ün var olup olmadığını kontrol et
  if (roleId && roleId !== existingSkill.roleId) {
    const role = await prisma.role.findUnique({
      where: { id: roleId }
    });

    if (!role) {
      return next(new ApiError('Role not found', 404));
    }
  }

  const skill = await prisma.skill.update({
    where: { id: req.params.id },
    data: {
      name: name || existingSkill.name,
      description: description !== undefined ? description : existingSkill.description,
      roleId: roleId !== undefined ? roleId : existingSkill.roleId
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      skill
    }
  });
  console.log('Update skill:', existingSkill.name, ' -> ', name);
});

// @desc    Delete skill
// @route   DELETE /api/v1/skills/:id
// @access  Private/Admin
exports.deleteSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const skill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!skill) {
    return next(new ApiError(`No skill found with id: ${id}`, 404));
  }

  await prisma.skill.delete({
    where: { id }
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
  console.log('Delete skill:', skill.name);
});

// @desc    Get skills by role
// @route   GET /api/v1/skills/role/:roleId
// @access  Public
exports.getSkillsByRole = asyncHandler(async (req, res, next) => {
  const { roleId } = req.params;

  const role = await prisma.role.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    return next(new ApiError('Role not found', 404));
  }

  const skills = await prisma.skill.findMany({
    where: {
      roleId: roleId
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    results: skills.length,
    data: {
      skills
    }
  });
});

// @desc    Assign skill to role
// @route   PATCH /api/v1/skills/:id/assign
// @access  Private/Admin
exports.assignSkillToRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { roleId } = req.body;

  // Skill'in var olup olmadığını kontrol et
  const skill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!skill) {
    return next(new ApiError('Skill not found', 404));
  }

  // Role'ün var olup olmadığını kontrol et
  const role = await prisma.role.findUnique({
    where: { id: roleId }
  });

  if (!role) {
    return next(new ApiError('Role not found', 404));
  }

  // Skill'i role'e ata
  const updatedSkill = await prisma.skill.update({
    where: { id },
    data: {
      roleId: roleId
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      skill: updatedSkill
    }
  });
});

// @desc    Remove skill from role (set roleId to null)
// @route   PATCH /api/v1/skills/:id/remove-role
// @access  Private/Admin
exports.removeSkillFromRole = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // Skill'in var olup olmadığını kontrol et
  const skill = await prisma.skill.findUnique({
    where: { id }
  });

  if (!skill) {
    return next(new ApiError('Skill not found', 404));
  }

  // Eğer skill zaten bir role'e bağlı değilse
  if (!skill.roleId) {
    return next(new ApiError('Skill is not assigned to any role', 400));
  }

  // Skill'in roleId'sini null yap
  const updatedSkill = await prisma.skill.update({
    where: { id },
    data: {
      roleId: null
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      skill: updatedSkill
    }
  });
});

// @desc    Get skills without role (unassigned skills)
// @route   GET /api/v1/skills/unassigned
// @access  Public
exports.getUnassignedSkills = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const total = await prisma.skill.count({
    where: {
      roleId: null
    }
  });

  const skills = await prisma.skill.findMany({
    where: {
      roleId: null
    },
    skip: skip,
    take: limit,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      role: {
        select: {
          id: true,
          name: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    results: skills.length,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    },
    data: {
      skills
    }
  });
});
