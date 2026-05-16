import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { jwtConfig } from "../config/jwt.js";
import { prisma } from "../config/database.js";
import { ApiError } from "../utils/apiError.js";

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new ApiError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    const decoded = jwt.verify(token, jwtConfig.JWT_SECRET) as { id: number };

    const currentUser = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

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
    let token: string | undefined;

    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new ApiError(
          "You are not logged in! Please log in to get access.",
          401,
        ),
      );
    }

    try {
      const decoded = jwt.verify(token, jwtConfig.JWT_SECRET) as { id: number };
      const currentUser = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (currentUser) {
        const { passwordHash: _, ...userWithoutPassword } = currentUser;
        req.user = userWithoutPassword;
      }
    } catch (_err) {}

    next();
  },
);
