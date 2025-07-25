const mongoose = require('mongoose');
// 1- Create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      unique: false,
      minlength: [3, 'User name must be at least 3 characters long'],
      maxlength: [32, 'User name must be at most 32 characters long'],
    },
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: [true, 'Email must be unique'],
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false, // Do not return password in queries
    },
  },
  { timestamps: true }
);

// 2- Create model
const userModel = mongoose.model('User', userSchema);

module.exports = userModel;


