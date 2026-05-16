import jwt, { type SignOptions } from "jsonwebtoken";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/database.js";
import { jwtConfig } from "../config/jwt.js";
import { ApiError } from "../utils/apiError.js";
import {
  sendVerificationCode,
  generateVerificationCode,
  sendPasswordResetEmail,
} from "./emailService.js";

export const register = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new ApiError("User already exists with this email", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateVerificationCode();
  const verificationExpires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      emailVerificationCode: verificationCode,
      emailVerificationExpires: verificationExpires,
      isVerified: false,
    },
  });

  const signOptions: SignOptions = {
    expiresIn: jwtConfig.JWT_EXPIRES_IN as `${number}d`,
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, isVerified: false },
    jwtConfig.JWT_SECRET,
    signOptions,
  );

  await sendVerificationCode({ email: user.email, code: verificationCode });

  const { emailVerificationCode: _, ...rest } = user;
  const userWithoutPassword = {
    ...rest,
    passwordHash: undefined,
    emailVerificationCode: undefined,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("New user registered:", user.email);
    console.log("Verification code:", verificationCode);
  }

  return {
    status: "success",
    message:
      "Registration successful! Please check your email for the 6-digit verification code.",
    data: { user: userWithoutPassword },
    token,
  };
};

export const verifyEmail = async (userId: number, code: string | number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.isVerified) {
    throw new ApiError("Email already verified", 400);
  }

  const codeStr = String(code).trim();
  const dbCodeStr = String(user.emailVerificationCode).trim();

  if (dbCodeStr !== codeStr) {
    throw new ApiError("Invalid verification code", 400);
  }

  if (new Date() > (user.emailVerificationExpires ?? new Date())) {
    throw new ApiError("Verification code has expired", 400);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      isVerified: true,
      emailVerificationCode: null,
      emailVerificationExpires: null,
    },
  });

  const verifySignOptions: SignOptions = {
    expiresIn: jwtConfig.JWT_EXPIRES_IN as `${number}d`,
  };

  const newToken = jwt.sign(
    { id: updatedUser.id, email: updatedUser.email, isVerified: true },
    jwtConfig.JWT_SECRET,
    verifySignOptions,
  );

  return {
    status: "success",
    message: "Email verified successfully",
    token: newToken,
    data: {
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        isVerified: true,
      },
    },
  };
};

export const resendCode = async (userId: number) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.isVerified) {
    throw new ApiError("Email already verified", 400);
  }

  const newCode = generateVerificationCode();
  const newExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: userId },
    data: {
      emailVerificationCode: newCode,
      emailVerificationExpires: newExpires,
    },
  });

  await sendVerificationCode({ email: user.email, code: newCode });

  if (process.env.NODE_ENV === "development") {
    console.log("Verification code resent:", user.email);
    console.log("New code:", newCode);
  }

  return {
    status: "success",
    message: "New verification code sent to your email",
  };
};

export const login = async (email: string, password: string) => {
  if (!email || !password) {
    throw new ApiError("Please provide email and password", 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError("Incorrect email or password", 401);
  }

  if (!user.isVerified) {
    throw new ApiError(
      "Please verify your email address before logging in",
      403,
    );
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new ApiError("Incorrect email or password", 401);
  }

  const loginSignOptions: SignOptions = {
    expiresIn: jwtConfig.JWT_EXPIRES_IN as `${number}d`,
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, isVerified: user.isVerified },
    jwtConfig.JWT_SECRET,
    loginSignOptions,
  );

  const { emailVerificationCode: _, ...rest } = user;
  const userWithoutPassword = {
    ...rest,
    passwordHash: undefined,
    emailVerificationCode: undefined,
  };

  if (process.env.NODE_ENV === "development") {
    console.log("User logged in:", user.email);
  }

  return {
    status: "success",
    message: "Login successful",
    token,
    data: { user: userWithoutPassword },
  };
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token");

  if (process.env.NODE_ENV === "development") {
    console.log("User logged out:", req.user?.email);
  }

  return {
    status: "success",
    message: "Logged out successfully",
  };
};

export const forgotPassword = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError("If the email exists, a reset code will be sent", 200);
  }

  if (!user.isVerified) {
    throw new ApiError("Please verify your email first", 400);
  }

  const resetCode = generateVerificationCode();
  const resetExpires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordResetCode: resetCode,
      passwordResetExpires: resetExpires,
    },
  });

  await sendPasswordResetEmail({ email: user.email, code: resetCode });

  if (process.env.NODE_ENV === "development") {
    console.log("Password reset requested:", user.email);
    console.log("Reset code:", resetCode);
  }

  return {
    status: "success",
    message: "Password reset code sent to your email",
  };
};

export const resetPassword = async (
  email: string,
  code: string | number,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError("Invalid reset request", 400);
  }

  if (!user.passwordResetCode || !user.passwordResetExpires) {
    throw new ApiError("Invalid reset request", 400);
  }

  if (new Date() > user.passwordResetExpires) {
    throw new ApiError(
      "Reset code has expired. Please request a new one.",
      400,
    );
  }

  const codeStr = String(code).trim();
  const dbCodeStr = String(user.passwordResetCode).trim();

  if (dbCodeStr !== codeStr) {
    throw new ApiError("Invalid reset code", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      passwordHash: hashedPassword,
      passwordResetCode: null,
      passwordResetExpires: null,
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Password reset successful:", user.email);
  }

  return {
    status: "success",
    message:
      "Password reset successful. You can now login with your new password.",
  };
};
