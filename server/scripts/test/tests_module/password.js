const { API_ENDPOINTS, DEFAULT_TEST_USER } = require('./config.js');
const {
  colors, log, formatResult, makeRequest, delay,
  askQuestion, getHostname, getPort, getAuthHeaders
} = require('./utils.js');

let currentPassword = DEFAULT_TEST_USER.password;

async function testChangePassword() {
  console.log('\n' + colors.bold + '🧪 Testing PUT /change-password' + colors.reset);
  const newPassword = `NewTest${Date.now()}!`;
  const postData = JSON.stringify({
    currentPassword: currentPassword,
    newPassword: newPassword
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.changePassword,
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, postData);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  log('info', `Response: ${JSON.stringify(res.body).substring(0, 100)}...`);
  if (res.status === 200) {
    currentPassword = newPassword;
    log('success', 'Password updated successfully');
  }
  await delay(2000);
  return res;
}

async function testForgotPassword(email) {
  console.log('\n' + colors.bold + '🧪 Testing POST /forgot-password' + colors.reset);
  log('info', `Using email: ${email}`);
  const postData = JSON.stringify({
    email: email
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.forgotPassword,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  log('info', `Response: ${JSON.stringify(res.body).substring(0, 100)}...`);
  await delay(2000);
  return res;
}

async function testResetPassword(email) {
  console.log('\n' + colors.bold + '🧪 Testing POST /reset-password' + colors.reset);
  log('warn', 'Enter reset code from email:');
  const resetCode = await askQuestion('   > ');
  const newPassword = 'ResetTest123456!';
  const postData = JSON.stringify({
    email: email,
    code: resetCode,
    newPassword: newPassword
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.resetPassword,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  log('info', `Response: ${JSON.stringify(res.body).substring(0, 100)}...`);
  if (res.status === 200) {
    currentPassword = newPassword;
    log('success', `Password reset to: ${newPassword}`);
  }
  await delay(2000);
  return res;
}

module.exports = {
  testChangePassword,
  testForgotPassword,
  testResetPassword
};