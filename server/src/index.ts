import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { prismaConnect } from "./config/database.js";
import globalError from "./middlewares/errorMiddleware.js";
import dentistRoute from "./routes/v1/dentistRoute.js";
import technicianRoute from "./routes/v1/technicianRoute.js";
import userRoute from "./routes/v1/userRoute.js";
import ApiError from "./utils/apiError.js";

const app = express();

const allowedOrigins = ["http://localhost:3001"];

prismaConnect();

app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/user", userRoute);
app.use("/api/v1/dentist", dentistRoute);
app.use("/api/v1/technician", technicianRoute);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError("Route not found", 404));
});

app.use(globalError);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(
    `🚀 Server is running on port ${port} and is running in http://localhost:${port}`,
  );
});

process.on("unhandledRejection", (err: unknown) => {
  console.error(
    `Unhandled Rejection: ${(err as Error).name} | ${(err as Error).message}`,
  );
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);// eslint-disable-line no-process-exit
  });
});
