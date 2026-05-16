import type { Request, Response, NextFunction } from "express";

interface ErrorWithStatus {
  statusCode?: number;
  status?: string;
  message?: string;
  stack?: string;
}

export const globalError = (
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProd(err, res);
  }
};

const sendErrorForDev = (err: ErrorWithStatus, res: Response) => {
  res.status(err.statusCode ?? 500).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorForProd = (err: ErrorWithStatus, res: Response) => {
  res.status(err.statusCode ?? 500).json({
    status: err.status,
    message: err.message,
  });
};
