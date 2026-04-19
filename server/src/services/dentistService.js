const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const prisma = require('../../prisma/client.js');

exports.getProfile = asynchandler(async (userId) => {
  const dentist = await prisma.dentist.findUnique({
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

  if (!dentist) {
    throw new ApiError('Dentist profile not found', 404);
  }

  return {
    status: 'success',
    data: dentist
  };
});

exports.updateProfile = asynchandler(async (userId, updateData) => {
  const { fullName, phone, clinicName, clinicAddress, clinicCity } = updateData;

  const existingDentist = await prisma.dentist.findUnique({
    where: { userId: userId }
  });

  if (!existingDentist) {
    throw new ApiError('Dentist profile not found', 404);
  }

  const dentist = await prisma.dentist.update({
    where: { userId: userId },
    data: {
      ...(fullName && { fullName }),
      ...(phone && { phone }),
      ...(clinicName && { clinicName }),
      ...(clinicAddress !== undefined && { clinicAddress }),
      ...(clinicCity !== undefined && { clinicCity })
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('Dentist profile updated:', userId);
  }

  return {
    status: 'success',
    message: 'Profile updated successfully',
    data: dentist
  };
});