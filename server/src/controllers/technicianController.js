const technicianService = require('../services/technicianService');

exports.getProfile = async (req, res, next) => {
  try {
    const result = await technicianService.getProfile(req.user.id);
    res.status(200).json({
      status: result.status,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const result = await technicianService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};