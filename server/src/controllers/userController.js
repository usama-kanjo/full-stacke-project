const userService = require('../services/userService');

exports.completeProfile = async (req, res, next) => {
  try {
    const result = await userService.completeProfile(req.user.id, req.body);
    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.user.id, currentPassword, newPassword);
    res.status(200).json({
      status: result.status,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};