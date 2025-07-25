const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const ApiError = require('../utils/apiError');

// @desc    Get specific user by Email
// @route   post /api/v1/user/login
// @access  Public
exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    // return res.status(400).json({ msg: 'Please provide email and password' });
    return next(new ApiError(`Please provide email and password`, 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    // return res.status(401).json({ msg: 'Incorrect email' });
    return next(new ApiError(`Incorrect email`, 401));
  }

  // 3) Password check (plain text comparison)
  if (user.password !== password) {
    // return res.status(401).json({ msg: 'Incorrect password' });
    return next(new ApiError(`Incorrect password`, 401));
  }

  res.status(200).json({ status: 'success', data: { user } });
});

// @desc    Create user
// @route   POST  /api/v1/user
// @access  Private
exports.createUser = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const user = await User.create({ name, slug: slugify(name), email: req.body.email, password: req.body.password });
  res.status(201).json({ data: user });
});

//
// // @desc    Get list of user
// // @route   GET /api/v1/user
// // @access  Public
// exports.getUsers = asyncHandler(async (req, res) => {
//   const page = req.query.page * 1 || 1;
//   const limit = req.query.limit * 1 || 5;
//   const skip = (page - 1) * limit;
//
//   const user = await User.find({}).skip(skip).limit(limit);
//   res.status(200).json({ results: user.length, page, data: user });
// });

// // @desc    Update specific user
// // @route   PUT /api/v1/user/:id
// // @access  Private
// exports.updateUser = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const { name } = req.body;
//
//   const user = await User.findOneAndUpdate(
//     { _id: id },
//     { name, slug: slugify(name) },
//     { new: true }
//   );
//
//   if (!user) {
//     res.status(404).json({ msg: `No user for this id ${id}` });
//     // return next(new ApiError(`No user for this id ${id}`, 404));
//   }
//   res.status(200).json({ data: user });
// });
//
// // @desc    Delete specific user
// // @route   DELETE /api/v1/user/:id
// // @access  Private
// exports.deleteUser = asyncHandler(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await User.findByIdAndDelete(id);
//
//   if (!user) {
//     res.status(404).json({ msg: `No user for this id ${id}` });
//     // return next(new ApiError(`No user for this id ${id}`, 404));
//   }
//   res.status(204).send();
// });

