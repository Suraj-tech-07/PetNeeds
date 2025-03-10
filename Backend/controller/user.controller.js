const userModel = require('../moduls/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../moduls/blacklistToken.model');




// Register User
module.exports.registerUser = async (req, res) => {
    console.log(req.body);
    try {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;

        // Check if user already exists
        const isUserExist = await userModel.findOne({ email });
        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await userModel.hashPassword(password);

        // Create a new user
        const user = new userModel({
            username,
            email,
            password: hashedPassword
        });

        // Save the user
        await user.save();

        // Generate the auth token
        const token = user.generateAuthToken();

        // Send a success response
        res.status(201).json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while registering the user" });
    }
};




































// // Register User
// module.exports.registerUser = async (req, res, next) => {
//     console.log(req.body);
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { fullname, email, password } = req.body;

//         const isUserExist = await userModel.findOne({ email });
//         if (isUserExist) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash the password
//         const hashedPassword = await userModel.hashPassword(password);

//         // Create a new user
//         const user = new userModel({
//             fullname: {
//                 firstname: fullname.firstname,
//                 lastname: fullname.lastname,
//             },
//             email,
//             password: hashedPassword,
//         });

//         // Save the user
//         await user.save();

//         // Generate the auth token
//         const token = await user.generateAuthToken();

//         // Send a success response
//         res.status(201).json({ token, user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred while registering the user" });
//     }
// };