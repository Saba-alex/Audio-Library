const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userControllers = require('../controllers/user')

const userValidation = [
    check('name').trim().not().isEmpty(),
    check('email').isEmail().normalizeEmail().withMessage('Please enter a valid email'),
    check('password').trim().isLength({min: 5})
];


router.post("/signup",userValidation ,userControllers.signup);

router.post("/login", userControllers.login);

module.exports = router;