const express = require('express');
const { loginUserValidator, createUserValidator, updateUserValidator, changePasswordValidator } = require('../utils/validators/userValidator');
const { protect } = require('../middlewares/authMiddleware');

const {
  loginUser,
  registerUser,
  getUserProfile,
  verifyEmail,
  resendVerificationEmail,
  updateUserProfile,
  logoutUser,
  checkAuth,
  changePassword
} = require('../services/userService');

const router = express.Router();

router.route('/register')
  .post(createUserValidator, registerUser);

router.route('/login')
  .post(loginUserValidator, loginUser);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/change-password')
  .put(protect, changePasswordValidator, changePassword);

router.route('/verify-email/:token')
  .get(verifyEmail);

router.route('/resend-verification')
  .post(resendVerificationEmail);

router.route('/logout')
  .get(protect, logoutUser);

router.route('/check-auth')
  .get(protect, checkAuth);
// Sadece adminler için
// router.delete('/user/:id', protect, restrictTo('admin'), deleteUser);



module.exports = router;
