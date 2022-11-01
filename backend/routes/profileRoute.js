const express = require('express');
const profileRoute = express.Router();
const { getLoginUser, updateUser } = require('../controllers/profileController');
const { loginValidations } = require('../validations/userValidation');
const authenticateLogin = require('../middleWares/authenticateLogin');

profileRoute
.get("/:userId", getLoginUser)
.patch("/edit-profile/:userId",loginValidations, updateUser);

module.exports = profileRoute;