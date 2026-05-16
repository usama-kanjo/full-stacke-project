import { API_ENDPOINTS, DEFAULT_TEST_USER } from "../config.js";
import {
  colors,
  log,
  formatResult,
  logResult,
  makeRequest,
  delay,
  askQuestion,
  getHostname,
  getPort,
  getAuthHeaders,
} from "../utils.js";

let currentPassword = DEFAULT_TEST_USER.password;

export async function testChangePassword() {
  console.log(`\n${colors.bold}🧪 Testing PUT /change-password${colors.reset}`);
  const newPassword = `NewTest${Date.now()}!`;
  const postData = JSON.stringify({
    currentPassword: currentPassword,
    newPassword: newPassword,
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.changePassword,
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
      ...getAuthHeaders(),
    },
  };

  const res = await makeRequest(
    options as Parameters<typeof makeRequest>[0],
    postData,
  );
  const result = formatResult(res.status);
  log("test", `${result} Status: ${res.status}`);
  logResult(res.status, res.body);
  if (res.status === 200) {
    currentPassword = newPassword;
    log("success", "Password updated successfully");
  }
  await delay(2000);
  return res;
}

export async function testForgotPassword(email: string) {
  console.log(
    `\n${colors.bold}🧪 Testing POST /forgot-password${colors.reset}`,
  );
  log("info", `Using email: ${email}`);
  const postData = JSON.stringify({
    email: email,
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.forgotPassword,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const res = await makeRequest(
    options as Parameters<typeof makeRequest>[0],
    postData,
  );
  const result = formatResult(res.status);
  log("test", `${result} Status: ${res.status}`);
  logResult(res.status, res.body);
  await delay(2000);
  return res;
}

export async function testResetPassword(email: string) {
  console.log(`\n${colors.bold}🧪 Testing POST /reset-password${colors.reset}`);
  log("warn", "Enter reset code from email:");
  const resetCode = await askQuestion("   > ");
  const newPassword = "ResetTest123456!";
  const postData = JSON.stringify({
    email: email,
    code: resetCode,
    newPassword: newPassword,
  });

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.resetPassword,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(postData),
    },
  };

  const res = await makeRequest(
    options as Parameters<typeof makeRequest>[0],
    postData,
  );
  const result = formatResult(res.status);
  log("test", `${result} Status: ${res.status}`);
  logResult(res.status, res.body);
  if (res.status === 200) {
    currentPassword = newPassword;
    log("success", `Password reset to: ${newPassword}`);
  }
  await delay(2000);
  return res;
}
