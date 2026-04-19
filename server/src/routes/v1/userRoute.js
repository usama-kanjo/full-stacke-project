const express = require('express');
const { loginUserValidator, createUserValidator, changePasswordValidator, forgotPasswordValidator, resetPasswordValidator, completeProfileValidator } = require('../../validators/userValidator');
const { protect, softProtect } = require('../../middlewares/authMiddleware');

const authController = require('../../controllers/authController');
const userController = require('../../controllers/userController');

const router = express.Router();

router.route('/register')
  .post(createUserValidator, authController.register);

router.route('/login')
  .post(loginUserValidator, authController.login);

router.route('/verify-email')
  .post(softProtect, authController.verifyEmail);

router.route('/resend-code')
  .post(softProtect, authController.resendCode);

router.route('/logout')
  .post(protect, authController.logout);

router.route('/complete-profile')
  .post(protect, completeProfileValidator, userController.completeProfile);

router.route('/change-password')
  .put(protect, changePasswordValidator, userController.changePassword);

router.route('/forgot-password')
  .post(forgotPasswordValidator, authController.forgotPassword);

router.route('/reset-password')
  .post(resetPasswordValidator, authController.resetPassword);

module.exports = router;
