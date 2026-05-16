import { API_ENDPOINTS } from "../config.js";
import {
  colors,
  log,
  formatResult,
  logResult,
  makeRequest,
  delay,
  getHostname,
  getPort,
  getAuthHeaders,
} from "../utils.js";

type Role = "DENTIST" | "LAB_TECHNICIAN";

export async function testCompleteProfile(role: Role) {
  console.log(
    `\n${colors.bold}🧪 Testing POST /complete-profile as ${role}${
      colors.reset
    }`,
  );
  const profileData: Record<string, string | undefined> = {
    role: role,
    fullName: role === "DENTIST" ? "Dr. Test Dentist" : "Test Technician",
    phone: "+90 532 123 4567",
  };

  if (role === "DENTIST") {
    profileData.clinicName = "Test Clinic";
    profileData.clinicAddress = "Test Address";
    profileData.clinicCity = "Istanbul";
  } else {
    profileData.labName = "Test Lab";
    profileData.labAddress = "Test Lab Address";
    profileData.labCity = "Ankara";
  }

  const postData = JSON.stringify(profileData);

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.completeProfile,
    method: "POST",
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
  await delay(2000);
  return res;
}

export async function testGetProfile(role: Role) {
  console.log(
    `\n${colors.bold}🧪 Testing GET /${role.toLowerCase()}/profile${
      colors.reset
    }`,
  );
  const profilePath =
    role === "DENTIST"
      ? API_ENDPOINTS.dentist.profile
      : API_ENDPOINTS.technician.profile;

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: profilePath,
    method: "GET",
    headers: {
      ...getAuthHeaders(),
    },
  };

  const res = await makeRequest(options as Parameters<typeof makeRequest>[0]);
  const result = formatResult(res.status);
  log("test", `${result} Status: ${res.status}`);
  logResult(res.status, res.body);
  await delay(2000);
  return res;
}

export async function testUpdateProfile(role: Role) {
  console.log(
    `\n${colors.bold}🧪 Testing PUT /${role.toLowerCase()}/profile${
      colors.reset
    }`,
  );
  const profilePath =
    role === "DENTIST"
      ? API_ENDPOINTS.dentist.profile
      : API_ENDPOINTS.technician.profile;

  const updateData =
    role === "DENTIST"
      ? { fullName: "Updated Dr. Test Dentist", clinicCity: "Izmir" }
      : { fullName: "Updated Test Technician", labCity: "Bursa" };

  const postData = JSON.stringify(updateData);

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: profilePath,
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
  await delay(2000);
  return res;
}
