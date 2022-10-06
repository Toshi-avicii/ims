const express = require('express');
const authRouter = express.Router();
const { login } = require('../controllers/authController');

// just a sample route
authRouter.get('/login', login);

module.exports = authRouter;