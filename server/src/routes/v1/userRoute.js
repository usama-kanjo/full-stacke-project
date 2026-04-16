const express = require('express');
const { loginUserValidator, createUserValidator, changePasswordValidator } = require('../../validators/userValidator');
const { protect } = require('../../middlewares/authMiddleware');

const authController = require('../../controllers/authController');

const router = express.Router();

router.route('/register')
  .post(createUserValidator, authController.register);

router.route('/login')
  .post(loginUserValidator, authController.login);

router.route('/verify-email')
  .post(protect, authController.verifyEmail);

router.route('/resend-code')
  .post(protect, authController.resendCode);

router.route('/logout')
  .post(protect, authController.logout);

router.route('/change-password')
  .put(protect, changePasswordValidator, authController.changePassword);

module.exports = router;
