// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const userController = require('../controller/user.controller');
// const userMiddleware = require('../middlewares/user.middleware');

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const userController = require('../controller/user.controller');

router.post("/register", [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    // body("fullname.firstname").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
    // body("fullname.lastname").isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
], userController.registerUser);

module.exports = router;