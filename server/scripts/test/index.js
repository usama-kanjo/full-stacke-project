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

function trackTestResult(status) {
  testResults.total++;
  if (status >= 200 && status < 400) {
    testResults.passed++;
  } else {
    testResults.failed++;
  }
}

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
    trackTestResult((await testVerifyEmail()).status);
    trackTestResult((await testCompleteProfile('DENTIST')).status);
    trackTestResult((await testGetProfile('DENTIST')).status);
    trackTestResult((await testUpdateProfile('DENTIST')).status);
    trackTestResult((await testCompleteProfile('LAB_TECHNICIAN')).status);
    trackTestResult((await testGetProfile('LAB_TECHNICIAN')).status);
    trackTestResult((await testUpdateProfile('LAB_TECHNICIAN')).status);
    trackTestResult((await testChangePassword()).status);
    trackTestResult((await testLogout()).status);
    printSummary();
  } else {
    trackTestResult((await testRegister()).status);
    trackTestResult((await testResendCode()).status);
    trackTestResult((await testVerifyEmail()).status);
    trackTestResult((await testCompleteProfile('DENTIST')).status);
    trackTestResult((await testGetProfile('DENTIST')).status);
    trackTestResult((await testUpdateProfile('DENTIST')).status);
    trackTestResult((await testChangePassword()).status);
    trackTestResult((await testLogout()).status);
    trackTestResult((await testRegister()).status);
    trackTestResult((await testVerifyEmail()).status);
    trackTestResult((await testCompleteProfile('LAB_TECHNICIAN')).status);
    trackTestResult((await testGetProfile('LAB_TECHNICIAN')).status);
    trackTestResult((await testUpdateProfile('LAB_TECHNICIAN')).status);
    trackTestResult((await testChangePassword()).status);
    trackTestResult((await testLogout()).status);
    trackTestResult((await testRegister()).status);
    trackTestResult((await testResendCode()).status);
    trackTestResult((await testVerifyEmail()).status);
    trackTestResult((await testLogout()).status);
    trackTestResult((await testLogin()).status);
    trackTestResult((await testLogout()).status);
    log('warn', 'Testing Forgot Password Flow:');
    trackTestResult((await testForgotPassword(testUser.email)).status);
    log('warn', 'Check console/email for reset code');
    trackTestResult((await testResetPassword(testUser.email)).status);
    printSummary();
  }
}

runAllTests().catch(err => {
  log('error', `Test failed: ${err.message}`);
  process.exit(1);
});