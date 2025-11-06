const asyncHandler = require('express-async-handler');
const prisma = require('../prisma/client');
const ApiError = require('../utils/apiError');

// @desc    Create new role
// @route   POST /api/v1/roles
// @access  Private/Admin
exports.createRole = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  // Check if role with this name already exists
  const existingRole = await prisma.role.findUnique({
    where: { name }
  });

  if (existingRole) {
    return next(new ApiError('Role with this name already exists', 400));
  }

  const role = await prisma.role.create({
    data: {
      name,
      description
    },
    include: {
      skills: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    }
  });

  res.status(201).json({
    status: 'success',
    data: {
      role
    }
  });
  console.log(`new role added ${role.name}`);
});

// @desc    Get all roles
// @route   GET /api/v1/roles?page=1&limit=5
// @access  Private/Admin
exports.getAllRoles = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 5;
  const skip = (page - 1) * limit;

  const total = await prisma.role.count();

  const roles = await prisma.role.findMany({
    skip: skip,
    take: limit,
    include: {
      skills: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: 'success',
    results: roles.length,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },
    data: {
      roles
    }
  });
});

// @desc    Get single role
// @route   GET /api/v1/roles/:id
// @access  Private/Admin
exports.getRole = asyncHandler(async (req, res, next) => {
  const role = await prisma.role.findUnique({
    where: { id: req.params.id },
    include: {
      skills: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    }
  });

  if (!role) {
    return next(new ApiError(`No role found with id: ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      role
    }
  });
  console.log(`new role added ${role.name}`);
});

// @desc    Update role
// @route   PATCH /api/v1/roles/:id
// @access  Private/Admin
exports.updateRole = asyncHandler(async (req, res, next) => {
  const { name, description } = req.body;

  const existingRole = await prisma.role.findUnique({
    where: { id: req.params.id }
  });

  if (!existingRole) {
    return next(new ApiError(`No role found with id: ${req.params.id}`, 404));
  }

  // Check if name is being updated and if it already exists
  if (name && name !== existingRole.name) {
    const roleWithSameName = await prisma.role.findUnique({
      where: { name }
    });

    if (roleWithSameName) {
      return next(new ApiError('Role with this name already exists', 400));
    }
  }

  const role = await prisma.role.update({
    where: { id: req.params.id },
    data: {
      name: name || existingRole.name,
      description: description !== undefined ? description : existingRole.description
    },
    include: {
      skills: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      role
    }
  });
});

// @desc    Delete role
// @route   DELETE /api/v1/roles/:id
// @access  Private/Admin
exports.deleteRole = asyncHandler(async (req, res, next) => {
  const role = await prisma.role.findUnique({
    where: { id: req.params.id },
    include: {
      skills: true
    }
  });

  if (!role) {
    return next(new ApiError(`No role found with id: ${req.params.id}`, 404));
  }

  // Eğer role'e bağlı skill'ler varsa, önce onların roleId'sini null yap
  if (role.skills.length > 0) {
    await prisma.skill.updateMany({
      where: {
        roleId: req.params.id
      },
      data: {
        roleId: null
      }
    });
  }

  await prisma.role.delete({
    where: { id: req.params.id }
  });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

// @desc    Add skill to role
// @route   POST /api/v1/roles/:id/skills
// @access  Private/Admin
exports.addSkillToRole = asyncHandler(async (req, res, next) => {
  const { skillId } = req.body;

  const role = await prisma.role.findUnique({
    where: { id: req.params.id }
  });

  if (!role) {
    return next(new ApiError('Role not found', 404));
  }

  const skill = await prisma.skill.findUnique({
    where: { id: skillId }
  });

  if (!skill) {
    return next(new ApiError('Skill not found', 404));
  }

  // Eğer skill zaten bir role'e bağlıysa kontrol et
  if (skill.roleId) {
    return next(new ApiError('Skill is already assigned to another role', 400));
  }

  // Skill'i role'e bağla
  const updatedSkill = await prisma.skill.update({
    where: { id: skillId },
    data: {
      roleId: req.params.id
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

  // Güncellenmiş role'ü getir (skill'lerle birlikte)
  const updatedRole = await prisma.role.findUnique({
    where: { id: req.params.id },
    include: {
      skills: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      role: updatedRole,
      skill: updatedSkill
    }
  });
});

// @desc    Remove skill from role
// @route   DELETE /api/v1/roles/:id/skills/:skillId
// @access  Private/Admin
exports.removeSkillFromRole = asyncHandler(async (req, res, next) => {
  const { id, skillId } = req.params;

  const role = await prisma.role.findUnique({
    where: { id }
  });

  if (!role) {
    return next(new ApiError('Role not found', 404));
  }

  const skill = await prisma.skill.findUnique({
    where: { id: skillId }
  });

  if (!skill) {
    return next(new ApiError('Skill not found', 404));
  }

  // Skill'in bu role'e ait olup olmadığını kontrol et
  if (skill.roleId !== id) {
    return next(new ApiError('This skill does not belong to the specified role', 400));
  }

  // Skill'in roleId'sini null yap
  const updatedSkill = await prisma.skill.update({
    where: { id: skillId },
    data: {
      roleId: null
    }
  });

  // Güncellenmiş role'ü getir (skill'lerle birlikte)
  const updatedRole = await prisma.role.findUnique({
    where: { id },
    include: {
      skills: {
        select: {
          id: true,
          name: true,
          description: true
        }
      }
    }
  });

  res.status(200).json({
    status: 'success',
    data: {
      role: updatedRole,
      skill: updatedSkill
    }
  });
});

// @desc    Get roles with skill count
// @route   GET /api/v1/roles/stats/count
// @access  Private/Admin
exports.getRolesWithSkillCount = asyncHandler(async (req, res) => {
  const roles = await prisma.role.findMany({
    include: {
      _count: {
        select: {
          skills: true
        }
      },
      skills: {
        select: {
          id: true,
          name: true
        },
        take: 5 // İlk 5 skill'i göster
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  res.status(200).json({
    status: 'success',
    results: roles.length,
    data: {
      roles
    }
  });
});

// @desc    Search roles by name
// @route   GET /api/v1/roles/search?q=developer
// @access  Private/Admin
exports.searchRoles = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  if (!q) {
    return next(new ApiError('Please provide a search query', 400));
  }

  const total = await prisma.role.count({
    where: {
      name: {
        contains: q,
        mode: 'insensitive'
      }
    }
  });

  const roles = await prisma.role.findMany({
    where: {
      name: {
        contains: q,
        mode: 'insensitive'
      }
    },
    skip: skip,
    take: limit,
    include: {
      skills: {
        select: {
          id: true,
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: 'success',
    results: roles.length,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    },
    data: {
      roles
    }
  });
});
