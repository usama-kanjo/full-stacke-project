const http = require('http');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const TOKEN_FILE = path.join(__dirname, 'token.txt');

function getAuthHeaders() {
  return authToken ? { 'Cookie': `token=${authToken}` } : {};
}

function extractToken(setCookieHeader) {
  if (!setCookieHeader) return null;

  const cookies = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
  if (!tokenCookie) return null;

  return tokenCookie.split(';')[0].split('=')[1];
}

function saveToken(token) {
  fs.writeFileSync(TOKEN_FILE, token);
  console.log(`   💾 Token saved to file`);
}

function loadToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    return fs.readFileSync(TOKEN_FILE, 'utf8').trim();
  }
  return null;
}

function rl() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function askQuestion(question) {
  return new Promise((resolve) => {
    const r = rl();
    r.question(question, (answer) => {
      r.close();
      resolve(answer);
    });
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api/v1/user`;

let authToken = loadToken();
if (authToken) {
  console.log(`   🔑 Loaded token from file: ${authToken.substring(0, 50)}...`);
}
let testUser = {
  email: `test_${Date.now()}@example.com`,
  password: 'Test123456!',
  name: 'Test User'
};

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function testRegister() {
  console.log('\n🧪 Testing POST /register');
  const postData = JSON.stringify({
    email: testUser.email,
    password: testUser.password,
    // name: testUser.name
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));

  const newToken = extractToken(res.headers['set-cookie']);
  if (newToken) {
    authToken = newToken;
    saveToken(authToken);
    console.log(`   Token: ${authToken.substring(0, 50)}...`);
  }
  await delay(2000);
  return res;
}

async function testLogin() {
  console.log('\n🧪 Testing POST /login');
  const postData = JSON.stringify({
    email: testUser.email,
    password: testUser.password
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));

  const newToken2 = extractToken(res.headers['set-cookie']);
  if (newToken2) {
    authToken = newToken2;
    saveToken(authToken);
    console.log(`   Token: ${authToken.substring(0, 50)}...`);
  }
  await delay(2000);
  return res;
}

async function testResendCode() {
  console.log('\n🧪 Testing POST /resend-code');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/resend-code',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, '{}');
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));
  await delay(2000);
  return res;
}

async function testVerifyEmail() {
  console.log('\n🧪 Testing POST /verify-email');
  console.log('\n   📝 Please enter the verification code:');
  const verificationCode = await askQuestion('   > ');
  const postData = JSON.stringify({ verificationCode });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/verify-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, postData);
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));
  await delay(2000);
  return res;
}

async function testChangePassword() {
  console.log('\n🧪 Testing PUT /change-password');
  const postData = JSON.stringify({
    currentPassword: testUser.password,
    newPassword: 'NewTest123456!'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/change-password',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, postData);
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));
  if (res.status === 200) {
    testUser.password = 'NewTest123456!';
  }
  await delay(2000);
  return res;
}

async function testLogout() {
  console.log('\n🧪 Testing POST /logout');

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/logout',
    method: 'POST',
    headers: {
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options, '{}');
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));
  await delay(2000);
  return res;
}

async function testForgotPassword() {
  console.log('\n🧪 Testing POST /forgot-password');
  console.log(`   Using email: ${testUser.email}`);
  const postData = JSON.stringify({
    email: testUser.email
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/forgot-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));
  await delay(2000);
  return res;
}

async function testResetPassword() {
  console.log('\n🧪 Testing POST /reset-password');
  console.log('\n   📝 Please enter the reset code from email:');
  const resetCode = await askQuestion('   > ');
  const newPassword = 'ResetTest123456!';
  const postData = JSON.stringify({
    email: testUser.email,
    code: resetCode,
    newPassword: newPassword
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/v1/user/reset-password',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const res = await makeRequest(options, postData);
  console.log(`   Status: ${res.status}`);
  console.log(`   Response:`, JSON.stringify(res.body, null, 2));
  if (res.status === 200) {
    testUser.password = newPassword;
    console.log(`   🔑 Password updated to: ${newPassword}`);
  }
  await delay(2000);
  return res;
}

async function runAllTests() {
  console.log('🚀 Starting API Tests...\n');
  console.log(`Test User Email: ${testUser.email}`);
  console.log(`Test User Password: ${testUser.password}`);

  if (authToken) {
    console.log('\n📌 Found existing token - testing protected routes');
    await testVerifyEmail();
    await testChangePassword();
    await testLogout();
    console.log('\n✅ All tests completed!\n');
  } else {
    await testRegister();
    await testResendCode();
    await testVerifyEmail();
    await testChangePassword();
    await testLogout();
    await testLogin();
    console.log('\n📌 Testing Forgot Password Flow:');
    await testForgotPassword();
    console.log('\n   (Check console/email for reset code)');
    await testResetPassword();
    console.log('\n✅ All tests completed!\n');
  }
}

runAllTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
