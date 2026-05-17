if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const jwtConfig = {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "90d",
  JWT_COOKIE_EXPIRES: Number(process.env.JWT_COOKIE_EXPIRES) || 90,
};

export default jwtConfig;
