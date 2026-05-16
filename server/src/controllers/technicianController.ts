import type { Request, Response, NextFunction } from "express";
import * as technicianService from "../services/technicianService.js";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await technicianService.getProfile(req.user!.id);
    res.status(200).json({
      status: result.status,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await technicianService.updateProfile(
      req.user!.id,
      req.body,
    );
    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
