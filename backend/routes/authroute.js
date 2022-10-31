const express = require('express');
const authrouter = express.Router();
const { login, getLoginUser } = require('../controllers/authController');
const { loginValidations } = require('../validations/userValidation');
const authenticateLogin = require('../middleWares/authenticateLogin')

authrouter.post("/login", loginValidations, login);
authrouter.get("/profile/:userId", getLoginUser);

module.exports = authrouter;