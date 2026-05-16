import fs from "fs";
import readline from "readline";
import http from "http";
import { BASE_URL, TOKEN_FILE } from "./config.js";

export const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
};

interface RequestResult {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: unknown;
  error: string | null;
}

interface RequestOptions extends http.RequestOptions {
  hostname: string;
  port: number;
  path: string;
  method: string;
}

function getTimestamp(): string {
  return new Date().toISOString().replace("T", " ").substring(0, 19);
}

export function log(type: string, message: string): void {
  const prefix: Record<string, string> = {
    info: `${colors.cyan}[INFO]${colors.reset}`,
    success: `${colors.green}[PASS]${colors.reset}`,
    error: `${colors.red}[FAIL]${colors.reset}`,
    warn: `${colors.yellow}[WARN]${colors.reset}`,
    test: `${colors.magenta}[TEST]${colors.reset}`,
    step: `${colors.cyan}[STEP]${colors.reset}`,
  };
  console.log(
    `${prefix[type] || prefix.info} ${colors.dim}${getTimestamp()}${colors.reset} ${message}`,
  );
}

export function formatResult(status: number): string {
  return status >= 200 && status < 400 ? "✅" : "❌";
}

export function logResult(status: number, body: unknown): void {
  const message =
    (body as Record<string, unknown>)?.message ||
    ((body as Record<string, unknown>)?.error as Record<string, unknown>)
      ?.message ||
    "No message";
  if (status >= 200 && status < 400) {
    log("success", message as string);
  } else {
    log("error", message as string);
  }
}

export function saveToken(token: string): void {
  fs.writeFileSync(TOKEN_FILE, token);
  log("success", `Token saved to ${TOKEN_FILE}`);
}

export function loadToken(): string | null {
  if (fs.existsSync(TOKEN_FILE)) {
    return fs.readFileSync(TOKEN_FILE, "utf8").trim();
  }
  return null;
}

export function extractToken(
  setCookieHeader: string | string[] | undefined,
): string | null {
  if (!setCookieHeader) return null;

  const cookies = Array.isArray(setCookieHeader)
    ? setCookieHeader
    : [setCookieHeader];

  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  if (!tokenCookie) return null;

  return tokenCookie.split(";")[0].split("=")[1];
}

export function deleteToken(): void {
  if (fs.existsSync(TOKEN_FILE)) {
    fs.unlinkSync(TOKEN_FILE);
  }
}

export function makeRequest(
  options: RequestOptions,
  postData: string | null = null,
): Promise<RequestResult> {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: JSON.parse(data),
            error: null,
          });
        } catch (e) {
          const error = e as Error;
          log("warn", `JSON parse failed: ${error.message}`);
          resolve({
            status: res.statusCode || 0,
            headers: res.headers,
            body: data,
            error: "Invalid JSON response",
          });
        }
      });
    });
    req.on("error", reject);
    if (postData) req.write(postData);
    req.end();
  });
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function rl(): readline.Interface {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
}

export function askQuestion(question: string): Promise<string> {
  return new Promise((resolve) => {
    const r = rl();
    r.question(question, (answer) => {
      r.close();
      resolve(answer);
    });
  });
}

export function getHostname(): string {
  return new URL(BASE_URL).hostname;
}

export function getPort(): number {
  return parseInt(new URL(BASE_URL).port) || 80;
}

let cachedAuthToken: string | null = null;

export function getAuthHeaders(): Record<string, string> {
  return cachedAuthToken ? { Cookie: `token=${cachedAuthToken}` } : {};
}

export function setAuthToken(token: string | null): void {
  cachedAuthToken = token;
}

export function getStoredAuthToken(): string | null {
  cachedAuthToken = loadToken();
  return cachedAuthToken;
}
