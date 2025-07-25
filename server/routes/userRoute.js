const express = require('express');
const { param, validationResult } = require("express-validator");
const { loginUserValidator, createUserValidator } = require('../utils/validators/userValidator');

const {
  loginUser,
  createUser,
} = require('../services/userService');

const router = express.Router();

router.route('/').post(createUserValidator, createUser);
router
  .route('/login')
  .post(loginUserValidator, loginUser)

module.exports = router;

