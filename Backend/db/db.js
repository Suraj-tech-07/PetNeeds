const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log("Connected to DB");
    }).catch(err => {
        console.error(err.message);
    });
}

module.exports = connectDB;
