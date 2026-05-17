if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const expiresIn = process.env.JWT_EXPIRES_IN || "90d";
if (!/^\d+[dhms]$/.test(expiresIn)) {
  throw new Error(
    `Invalid JWT_EXPIRES_IN format: "${expiresIn}". Expected format like "90d", "7d", "1h"`,
  );
}

const jwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: expiresIn,
  JWT_COOKIE_EXPIRES: Number(process.env.JWT_COOKIE_EXPIRES) || 90,
};

export default jwtConfig;
