import type { Request, Response, NextFunction } from "express";
import * as dentistService from "../services/dentistService.js";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await dentistService.getProfile(req.user!.id);
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
    const result = await dentistService.updateProfile(req.user!.id, req.body);
    res.status(200).json({
      status: result.status,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
