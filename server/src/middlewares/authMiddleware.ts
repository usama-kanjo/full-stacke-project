import type { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { prisma } from "../config/database.js";
import jwtConfig from "../config/jwt.js";
import ApiError from "../utils/apiError.js";

const extractToken = (req: Request): string | undefined => {
  if (req.cookies?.token) {
    return req.cookies.token;
  }
  if (req.headers.authorization?.startsWith("Bearer")) {
    return req.headers.authorization.split(" ")[1];
  }
  return undefined;
};

const getUserFromToken = async (token: string) => {
  const decoded = jwt.verify(token, jwtConfig.JWT_SECRET) as { id: number };
  return prisma.user.findUnique({ where: { id: decoded.id } });
};

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
      return next(
        new ApiError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    const currentUser = await getUserFromToken(token);

    if (!currentUser) {
      return next(
        new ApiError("The user belonging to this token no longer exists.", 401),
      );
    }

    if (!currentUser.isVerified) {
      return next(
        new ApiError(
          "Please verify your email address to activate your account.",
          403,
        ),
      );
    }

    const { passwordHash: _, ...userWithoutPassword } = currentUser;
    req.user = userWithoutPassword;
    next();
  },
);

export const softProtect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = extractToken(req);

    if (!token) {
      return next(
        new ApiError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    try {
      const currentUser = await getUserFromToken(token);
      if (currentUser) {
        const { passwordHash: _, ...userWithoutPassword } = currentUser;
        req.user = userWithoutPassword;
      }
    } catch { }

    next();
  },
);
