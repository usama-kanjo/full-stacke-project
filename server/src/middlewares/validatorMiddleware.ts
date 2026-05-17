import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../utils/apiError.js";

const validatorMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(err => err.msg).join(". ");
    return next(new ApiError(messages, 400));
  }
  next();
};

export default validatorMiddleware;
