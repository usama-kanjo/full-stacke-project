const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const prisma = require('../../prisma/client.js');

exports.getProfile = asynchandler(async (userId) => {
  const technician = await prisma.technician.findUnique({
    where: { userId: userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isVerified: true,
          isProfileComplete: true,
          createdAt: true,
          updatedAt: true
        }
      }
    }
  });

  if (!technician) {
    throw new ApiError('Technician profile not found', 404);
  }

  return {
    status: 'success',
    data: technician
  };
});

exports.updateProfile = asynchandler(async (userId, updateData) => {
  const { fullName, phone, labName, labAddress, labCity } = updateData;

  const existingTechnician = await prisma.technician.findUnique({
    where: { userId: userId }
  });

  if (!existingTechnician) {
    throw new ApiError('Technician profile not found', 404);
  }

  const technician = await prisma.technician.update({
    where: { userId: userId },
    data: {
      ...(fullName && { fullName }),
      ...(phone && { phone }),
      ...(labName && { labName }),
      ...(labAddress !== undefined && { labAddress }),
      ...(labCity !== undefined && { labCity })
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Technician profile updated:', userId);
  }

  return {
    status: 'success',
    message: 'Profile updated successfully',
    data: technician
  };
});