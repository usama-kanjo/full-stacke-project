const express = require('express');
const { loginUserValidator, createUserValidator, updateUserValidator, changePasswordValidator } = require('../../utils/validators/userValidator');
const { protect } = require('../../middlewares/authMiddleware');

const {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  logoutUser,
  changePassword,
  loginUser,
  // getUserProfile,
  // verifyEmail,
  // resendVerificationEmail,
  // updateUserProfile,
  // checkAuth,
} = require('../../services/userService');

const router = express.Router();

router.route('/register')
  .post(createUserValidator, registerUser);
router.route('/verify-email')
  .post(protect, verifyEmail);
router.route('/resend-code')
  .post(protect, resendVerificationCode);
router.route('/logout')
  .post(protect, logoutUser);
router.route('/change-password')
  .put(protect, changePasswordValidator, changePassword);
router.route('/login')
  .post(loginUserValidator, loginUser);
//
// router.route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
//
// router.route('/change-password')
//   .put(protect, changePasswordValidator, changePassword);
//
//
//
// router.route('/check-auth')
//   .get(protect, checkAuth);
// Sadece adminler için
// router.delete('/user/:id', protect, restrictTo('admin'), deleteUser);



module.exports = router;
