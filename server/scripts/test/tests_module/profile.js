const { API_ENDPOINTS } = require('./config.js');
const {
  colors, log, formatResult, makeRequest, delay,
  getHostname, getPort, getAuthHeaders
} = require('./utils.js');

async function testCompleteProfile(role) {
  console.log('\n' + colors.bold + `🧪 Testing POST /complete-profile as ${role}` + colors.reset);
  const profileData = {
    role: role,
    fullName: role === 'DENTIST' ? 'Dr. Test Dentist' : 'Test Technician',
    phone: '+90 532 123 4567',
    clinicName: role === 'DENTIST' ? 'Test Clinic' : undefined,
    clinicAddress: role === 'DENTIST' ? 'Test Address' : undefined,
    clinicCity: role === 'DENTIST' ? 'Istanbul' : undefined,
    labName: role === 'LAB_TECHNICIAN' ? 'Test Lab' : undefined,
    labAddress: role === 'LAB_TECHNICIAN' ? 'Test Lab Address' : undefined,
    labCity: role === 'LAB_TECHNICIAN' ? 'Ankara' : undefined
  };

  const postData = JSON.stringify(profileData);

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: API_ENDPOINTS.user.completeProfile,
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
  log('info', `Response: ${JSON.stringify(res.body).substring(0, 100)}...`);
  await delay(2000);
  return res;
}

async function testGetProfile(role) {
  console.log('\n' + colors.bold + `🧪 Testing GET /${role.toLowerCase()}/profile` + colors.reset);
  const profilePath = role === 'DENTIST' ? API_ENDPOINTS.dentist.profile : API_ENDPOINTS.technician.profile;

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: profilePath,
    method: 'GET',
    headers: {
      ...getAuthHeaders()
    }
  };

  const res = await makeRequest(options);
  const result = formatResult(res.status);
  log('test', `${result} Status: ${res.status}`);
  log('info', `Response: ${JSON.stringify(res.body).substring(0, 100)}...`);
  await delay(2000);
  return res;
}

async function testUpdateProfile(role) {
  console.log('\n' + colors.bold + `🧪 Testing PUT /${role.toLowerCase()}/profile` + colors.reset);
  const profilePath = role === 'DENTIST' ? API_ENDPOINTS.dentist.profile : API_ENDPOINTS.technician.profile;

  const updateData = role === 'DENTIST'
    ? { fullName: 'Updated Dr. Test Dentist', clinicCity: 'Izmir' }
    : { fullName: 'Updated Test Technician', labCity: 'Bursa' };

  const postData = JSON.stringify(updateData);

  const options = {
    hostname: getHostname(),
    port: getPort(),
    path: profilePath,
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
  await delay(2000);
  return res;
}

module.exports = {
  testCompleteProfile,
  testGetProfile,
  testUpdateProfile
};