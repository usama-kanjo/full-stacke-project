const asynchandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const bcrypt = require('bcryptjs');
const prisma = require('../../prisma/client.js');

exports.changePassword = asynchandler(async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isCurrentPasswordValid) {
    throw new ApiError('Current password is incorrect', 401);
  }

  const isNewPasswordSame = await bcrypt.compare(newPassword, user.passwordHash);
  if (isNewPasswordSame) {
    throw new ApiError('New password must be different from current password', 400);
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: {
      passwordHash: hashedNewPassword
    }
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('User password changed:', user.email);
  }

  return {
    status: 'success',
    message: 'Password changed successfully'
  };
});
