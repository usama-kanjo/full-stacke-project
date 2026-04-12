// Örneğin config.js dosyası:
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET, // Gerçek uygulamada güçlü ve gizli bir key kullanın
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '90d', // Token süresi (örneğin 90 gün)
  JWT_COOKIE_EXPIRES: process.env.JWT_COOKIE_EXPIRES || 90, // Cookie süresi (gün cinsinden)
};
