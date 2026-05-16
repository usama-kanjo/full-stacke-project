import type { Request } from "express";
import type { User, Dentist, Technician } from "@prisma/client";

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
