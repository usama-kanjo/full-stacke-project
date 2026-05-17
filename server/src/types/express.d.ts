import type { Dentist, Technician, User } from "@prisma/client";
import type { Request } from "express";

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
