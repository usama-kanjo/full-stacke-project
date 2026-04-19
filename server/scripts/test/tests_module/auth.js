const { API_ENDPOINTS, DEFAULT_TEST_USER } = require('../config.js');
const {
  colors, log, formatResult, logResult, makeRequest, delay,
  askQuestion, getHostname, getPort, loadToken, extractToken, 
  saveToken, setAuthToken, getAuthHeaders
} = require('../utils.js');

let testUser = {
  email: `test_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`,
  password: DEFAULT_TEST_USER.password,
  name: DEFAULT_TEST_USER.name
};

async function testRegister(newEmail = null) {
  if (newEmail) {
    testUser.email = newEmail;
  } else {
    testUser.email = `test_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`;
  }

  console.log('\n' + colors.bold + '🧪 Testing POST /register' + colors.reset);
  const postData = JSON.stringify({
    email: testUser.email,
    password: testUser.password,
    name: testUser.name
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.register,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  logResult(res.status, res.body);

  const newToken = extractToken(res.headers['set-cookie']);
  if (newToken) {
    setAuthToken(newToken);
    saveToken(newToken);
    log('success', `Token received: ${newToken.substring(0, 50)}...`);
  }

  await delay(2000);
  return res;
}

async function testLogin() {
  console.log('\n' + colors.bold + '🧪 Testing POST /login' + colors.reset);
  const postData = JSON.stringify({
    email: testUser.email,
    password: testUser.password
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.login,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  logResult(res.status, res.body);

  const newToken2 = extractToken(res.headers['set-cookie']);
  if (newToken2) {
    setAuthToken(newToken2);
    saveToken(newToken2);
    log('success', `Token received: ${newToken2.substring(0, 50)}...`);
  }
  await delay(2000);
  return res;
}

async function testLogout() {
  console.log('\n' + colors.bold + '🧪 Testing POST /logout' + colors.reset);

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.logout,
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, '{}');
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  logResult(res.status, res.body);

  if (res.status === 200) {
    const { deleteToken } = require('../utils.js');
    setAuthToken(null);
    deleteToken();
    log('success', 'Token deleted');
  }

  await delay(2000);
  return res;
}

async function testVerifyEmail() {
  console.log('\n' + colors.bold + '🧪 Testing POST /verify-email' + colors.reset);
  log('warn', 'Enter verification code:');
  const verificationCode = await askQuestion('   > ');
  const postData = JSON.stringify({ verificationCode });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.verifyEmail,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, postData);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  logResult(res.status, res.body);

  const newToken = extractToken(res.headers['set-cookie']);
  if (newToken) {
    setAuthToken(newToken);
    saveToken(newToken);
    log('success', `Token refreshed: ${newToken.substring(0, 50)}...`);
  }

  await delay(2000);
  return res;
}

async function testResendCode() {
  console.log('\n' + colors.bold + '🧪 Testing POST /resend-code' + colors.reset);

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.resendCode,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, '{}');
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  logResult(res.status, res.body);
  await delay(2000);
  return res;
}

function getTestUser() {
  return testUser;
}

function getAuthToken() {
  return loadToken();
}

function resetTestUser() {
  testUser = {
    email: `test_${Date.now()}_${Math.floor(Math.random() * 10000)}@example.com`,
    password: DEFAULT_TEST_USER.password,
    name: DEFAULT_TEST_USER.name
  };
}

module.exports = {
  testRegister,
  testLogin,
  testLogout,
  testVerifyEmail,
  testResendCode,
  getTestUser,
  getAuthToken,
  setAuthToken,
  resetTestUser,
  getAuthHeaders
};