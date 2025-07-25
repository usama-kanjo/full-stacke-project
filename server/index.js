require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db')
const userRoute = require('./routes/userRoute');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');

// database connection
dbConnection();

// Middleware 
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Sadece frontend origin'ine izin ver
  credentials: true // Eğer cookie/authentication kullanıyorsanız
}));

// Mounting routes
app.use("/api/v1/user", userRoute);

app.all(/(.*)/, (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 404));
});

// Global error handler
app.use(globalError);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server is running on port ${port} and is ranning in http://localhost:${port}`));

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});

