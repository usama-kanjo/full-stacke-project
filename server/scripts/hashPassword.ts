import bcrypt from "bcryptjs";

const password = process.argv[2] || "defaultPassword";
const saltRounds = 10;

async function generateHash(): Promise<void> {
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log("Şifre:", password);
    console.log("Hash:", hash);

    const isValid = await bcrypt.compare(password, hash);
    console.log("Doğrulama:", isValid);
  } catch (error) {
    console.error("Hata:", error);
  }
}

generateHash();
