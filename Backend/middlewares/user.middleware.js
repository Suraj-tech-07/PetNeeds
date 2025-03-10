
const userModel = require('../moduls/user.model');
const jwt = require('jsonwebtoken');
const blacklistTokenModel = require('../moduls/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    try {
        // Extract token safely
        const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);

        if (!token) {
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }

        // Verify JWT first (before checking the blacklist)
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: "Unauthorized access: Invalid or expired token" });
        }

        // Check if the token is blacklisted
        const isBlackListed = await blacklistTokenModel.findOne({ token });
        if (isBlackListed) {
            return res.status(401).json({ message: "Unauthorized access: Token is blacklisted" });
        }

        // Find the user in the database
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: "Unauthorized access: User not found" });
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




















// const userModel = require('../moduls/user.model');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const blacklistTokenModel = require('../moduls/blacklistToken.model');


// // check error 

// module.exports.authUser = async (req, res, next) => {
//     try {
//         // Safely extract the token
//         const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//         // Check if the token is missing
//         if (!token) {
//             return res.status(401).json({ message: "Unauthorized access" });
//         }

//         // Check if the token is blacklisted
//         const isBlackListed = await blacklistTokenModel.findOne({ token });
//         if (isBlackListed) {
//             return res.status(401).json({ message: "Unauthorized access" });
//         }

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Find the user in the database
//         const user = await userModel.findById(decoded._id);
//         if (!user) {
//             return res.status(401).json({ message: "Unauthorized access" });
//         }

//         // Attach the user to the request
//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Auth Middleware Error:", error.message);
//         return res.status(401).json({ message: "Unauthorized access" });
//     }
// };