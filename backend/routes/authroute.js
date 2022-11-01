const express = require('express');
const authrouter = express.Router();
const { login, getLoginUser, updateUser } = require('../controllers/authController');
const { loginValidations } = require('../validations/userValidation');
const authenticateLogin = require('../middleWares/authenticateLogin');

authrouter.post("/login", loginValidations, login);

module.exports = authrouter;