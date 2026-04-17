// Örneğin config.js dosyası:

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key';
if (!process.env.JWT_SECRET) {
  console.warn('UYARI: JWT_SECRET tanımlı değil! Varsayılan değer kullanılıyor.');
}

module.exports = {
  JWT_SECRET: JWT_SECRET, // Gerçek uygulamada güçlü ve gizli bir key kullanın
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '90d', // Token süresi (örneğin 90 gün)
  JWT_COOKIE_EXPIRES: process.env.JWT_COOKIE_EXPIRES || 90, // Cookie süresi (gün cinsinden)
};
