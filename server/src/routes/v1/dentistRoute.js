const express = require('express');
const { protect } = require('../../middlewares/authMiddleware');
const dentistController = require('../../controllers/dentistController');

const router = express.Router();

router.route('/profile')
  .get(protect, dentistController.getProfile)
  .put(protect, dentistController.updateProfile);

module.exports = router;