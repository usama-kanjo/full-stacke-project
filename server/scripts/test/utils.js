const fs = require('fs');
const readline = require('readline');
const { BASE_URL, TOKEN_FILE } = require('./config.js');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  bold: '\x1b[1m',
  dim: '\x1b[2m'
};

function getTimestamp() {
  return new Date().toISOString().replace('T', ' ').substring(0, 19);
}

function log(type, message) {
  const prefix = {
    info: `${colors.cyan}[INFO]${colors.reset}`,
    success: `${colors.green}[PASS]${colors.reset}`,
    error: `${colors.red}[FAIL]${colors.reset}`,
    warn: `${colors.yellow}[WARN]${colors.reset}`,
    test: `${colors.magenta}[TEST]${colors.reset}`,
    step: `${colors.cyan}[STEP]${colors.reset}`
  };
  console.log(`${prefix[type] || prefix.info} ${colors.dim}${getTimestamp()}${colors.reset} ${message}`);
}

function formatResult(status) {
  return status >= 200 && status < 400 ? '✅' : '❌';
}

function logResult(status, body) {
  const message = body?.message || body?.error?.message || 'No message';
  if (status >= 200 && status < 400) {
    log('success', message);
  } else {
    log('error', message);
  }
}

function saveToken(token) {
  fs.writeFileSync(TOKEN_FILE, token);
  log('success', `Token saved to ${TOKEN_FILE}`);
}

function loadToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    return fs.readFileSync(TOKEN_FILE, 'utf8').trim();
  }
  return null;
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

function deleteToken() {
  if (fs.existsSync(TOKEN_FILE)) {
    fs.unlinkSync(TOKEN_FILE);
  }
}

const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data), error: null });
        } catch (e) {
          log('warn', `JSON parse failed: ${e.message}`);
          resolve({ status: res.statusCode, headers: res.headers, body: data, error: 'Invalid JSON response' });
        }
      });
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

function getHostname() {
  return new URL(BASE_URL).hostname;
}

function getPort() {
  return parseInt(new URL(BASE_URL).port) || 80;
}

let cachedAuthToken = null;

function getAuthHeaders() {
  return cachedAuthToken ? { 'Cookie': `token=${cachedAuthToken}` } : {};
}

function setAuthToken(token) {
  cachedAuthToken = token;
}

function getStoredAuthToken() {
  cachedAuthToken = loadToken();
  return cachedAuthToken;
}

module.exports = {
  colors,
  log,
  formatResult,
  logResult,
  saveToken,
  loadToken,
  extractToken,
  deleteToken,
  makeRequest,
  delay,
  askQuestion,
  getHostname,
  getPort,
  getAuthHeaders,
  setAuthToken,
  getStoredAuthToken
};