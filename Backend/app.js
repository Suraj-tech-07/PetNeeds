const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');

// ✅ Middleware should be set up BEFORE defining routes
app.use(cors());
app.use(express.json()); // ✅ Must be before routes to parse JSON data
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

connectDB(); // Call database connection function

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
