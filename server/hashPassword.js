const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'defaultPassword';
const saltRounds = 10;

async function generateHash() {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log('Şifre:', password);
    console.log('Hash:', hash);

    // Doğrulama
    const isValid = await bcrypt.compare(password, hash);
    console.log('Doğrulama:', isValid);
  } catch (error) {
    console.error('Hata:', error);
  }
}

generateHash();
