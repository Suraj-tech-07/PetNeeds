const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');

connectDB(); // call Database connection function
app.use(cors());

const userRoutes = require('./routes/user.routes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;