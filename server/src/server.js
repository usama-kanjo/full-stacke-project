require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const prismaConnect = require('./config/database');
const userRoute = require('./routes/v1/userRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');



const allowedOrigins = [
  'http://localhost:3001',
  // 'http://192.168.1.42:3000',
  // 'http://172.24.16.1:5173'  // WSL IP'si
];


// database connection
prismaConnect();

// Middleware 
app.use(express.json());
app.use(cors({
  origin: allowedOrigins, // Sadece frontend origin'ine izin ver
  credentials: true // Eğer cookie/authentication kullanıyorsanız
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Mounting routes
app.use("/api/v1/user", userRoute);

app.all(/(.*)/, (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalError);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`🚀 Server is running on port ${port} and is ranning in http://localhost:${port}`));

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});

