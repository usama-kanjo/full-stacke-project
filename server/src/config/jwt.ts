const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";
if (!process.env.JWT_SECRET) {
  console.warn(
    "UYARI: JWT_SECRET tanımlı değil! Varsayılan değer kullanılıyor.",
  );
}

export const jwtConfig = {
  JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "90d",
  JWT_COOKIE_EXPIRES: Number(process.env.JWT_COOKIE_EXPIRES) || 90,
};
