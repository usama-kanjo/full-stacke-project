const { DEFAULT_TEST_USER } = require('./config.js');
const {
  colors, log, loadToken
} = require('./utils.js');

const {
  testRegister, testLogin, testLogout, testVerifyEmail, testResendCode,
  getTestUser, getAuthToken, resetTestUser
} = require('./tests_module/auth.js');

const {
  testCompleteProfile, testGetProfile, testUpdateProfile
} = require('./tests_module/profile.js');

const {
  testChangePassword, testForgotPassword, testResetPassword
} = require('./tests_module/password.js');

let testResults = { passed: 0, failed: 0, total: 0 };

function printSummary() {
  console.log('\n' + colors.bold + '═'.repeat(50) + colors.reset);
  log('info', `Total: ${testResults.total} | ${colors.green}Passed: ${testResults.passed}${colors.reset} | ${colors.red}Failed: ${testResults.failed}${colors.reset}`);
  console.log(colors.bold + '═'.repeat(50) + colors.reset);
}

function printLegend() {
  console.log('\n' + colors.bold + '📖 Legend:' + colors.reset);
  console.log(`  ${colors.green}✅ PASS${colors.reset} - Status 2xx`);
  console.log(`  ${colors.red}❌ FAIL${colors.reset} - Status >= 400`);
  console.log(`  ${colors.cyan}[INFO]${colors.reset} - General info`);
  console.log(`  ${colors.yellow}[WARN]${colors.reset} - Warnings`);
  console.log(`  ${colors.magenta}[TEST]${colors.reset} - Test step result`);
  console.log('');
}

async function runAllTests() {
  printLegend();
  console.log(colors.bold + '🚀 Starting API Tests...' + colors.reset);
  
  const testUser = getTestUser();
  log('info', `Test User Email: ${testUser.email}`);
  log('info', `Test User Password: ${testUser.password}`);

  testResults = { passed: 0, failed: 0, total: 0 };

  const authToken = getAuthToken();
  if (authToken) {
    log('warn', 'Found existing token - testing protected routes');
    await testVerifyEmail();
    await testCompleteProfile('DENTIST');
    await testGetProfile('DENTIST');
    await testUpdateProfile('DENTIST');
    await testCompleteProfile('LAB_TECHNICIAN');
    await testGetProfile('LAB_TECHNICIAN');
    await testUpdateProfile('LAB_TECHNICIAN');
    await testChangePassword();
    await testLogout();
    printSummary();
  } else {
    await testRegister();
    await testResendCode();
    await testVerifyEmail();
    await testCompleteProfile('DENTIST');
    await testGetProfile('DENTIST');
    await testUpdateProfile('DENTIST');
    await testChangePassword();
    await testLogout();
    await testRegister();
    await testVerifyEmail();
    await testCompleteProfile('LAB_TECHNICIAN');
    await testGetProfile('LAB_TECHNICIAN');
    await testUpdateProfile('LAB_TECHNICIAN');
    await testChangePassword();
    await testLogout();
    await testRegister();
    await testResendCode();
    await testVerifyEmail();
    await testLogout();
    await testLogin();
    await testLogout();
    log('warn', 'Testing Forgot Password Flow:');
    await testForgotPassword(testUser.email);
    log('warn', 'Check console/email for reset code');
    await testResetPassword(testUser.email);
    printSummary();
  }
}

runAllTests().catch(err => {
  log('error', `Test failed: ${err.message}`);
  process.exit(1);
});