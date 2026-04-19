const dentistService = require('../services/dentistService');

exports.getProfile = async (req, res, next) => {
  try {
    const result = await dentistService.getProfile(req.user.id);
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
    const result = await dentistService.updateProfile(req.user.id, req.body);
    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data
    });
  } catch (error) {
    next(error);
  }
};