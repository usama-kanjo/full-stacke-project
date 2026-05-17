import type { NextFunction, Request, Response } from "express";
import * as userService from "../services/userService.js";

export const completeProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await userService.completeProfile(req.user!.id, req.body);
    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const result = await userService.changePassword(
      req.user!.id,
      currentPassword,
      newPassword,
    );
    res.status(200).json({
      status: result.status,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
