const express = require('express');
const {
  getUser,
  createUser,
} = require('../services/userService');

const router = express.Router();

router.route('/').post(createUser);
router
  .route('/login')
  .post(getUser)

module.exports = router;

