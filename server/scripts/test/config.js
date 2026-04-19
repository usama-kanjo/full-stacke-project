const path = require('path');

const TOKEN_FILE = path.join(__dirname, '../token.txt');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

const API_ENDPOINTS = {
  user: {
    register: '/api/v1/user/register',
    login: '/api/v1/user/login',
    logout: '/api/v1/user/logout',
    verifyEmail: '/api/v1/user/verify-email',
    resendCode: '/api/v1/user/resend-code',
    changePassword: '/api/v1/user/change-password',
    forgotPassword: '/api/v1/user/forgot-password',
    resetPassword: '/api/v1/user/reset-password',
    completeProfile: '/api/v1/user/complete-profile'
  },
  dentist: {
    profile: '/api/v1/dentist/profile'
  },
  technician: {
    profile: '/api/v1/technician/profile'
  }
};

const DEFAULT_TEST_USER = {
  password: 'Test123456!',
  name: 'Test User'
};

module.exports = {
  TOKEN_FILE,
  BASE_URL,
  API_ENDPOINTS,
  DEFAULT_TEST_USER
};