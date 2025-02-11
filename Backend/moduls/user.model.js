const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// after that i have to work in controller , router , service file and install express-validator package to validate the user input


const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength:[3 , 'First name must be at leat 3 charaters']
        },
        lastName: {
            type: String,
            required: true,
            minlength:[3 , 'Last name must be at leat 3 charaters']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength:[3 , 'Email must be at leat 3 charaters']
    },
    password: {
        type: String,
        required: true,
        select : false
    }
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;