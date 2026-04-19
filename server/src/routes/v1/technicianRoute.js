const express = require('express');
const { protect } = require('../../middlewares/authMiddleware');
const technicianController = require('../../controllers/technicianController');

const router = express.Router();

router.route('/profile')
  .get(protect, technicianController.getProfile)
  .put(protect, technicianController.updateProfile);

module.exports = router;