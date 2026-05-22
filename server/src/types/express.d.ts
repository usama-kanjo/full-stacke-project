import type { Request } from "express";
import type { Dentist, Technician, User } from "../generated/prisma/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: Omit<User, "passwordHash"> & {
        dentist?: Dentist;
        technician?: Technician;
      };
    }
  }
}

export type RequestWithUser = Request;
