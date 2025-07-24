require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db')
const userRoute = require('./routes/userRoute');
// database connection
dbConnection();

// Middleware 
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Sadece frontend origin'ine izin ver
  credentials: true // Eğer cookie/authentication kullanıyorsanız
}));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port} and is ranning in http://localhost:${port}`));
app.use("/api/v1/user", userRoute);
