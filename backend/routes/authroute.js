const express = require('express');
const authrouter = express.Router();
const { login } = require('../controllers/authControllers');
const { loginValidations } = require('../validations/userValidation');

authrouter.post("/login", loginValidations, login);

module.exports = authrouter;