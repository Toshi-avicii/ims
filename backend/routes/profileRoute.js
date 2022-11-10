const express = require('express');
const profileRoute = express.Router();
const { getLoginUser, updateUser } = require('../controllers/profileController');
const { loginValidations } = require('../validations/userValidation');
const authenticateLogin = require('../middleWares/authenticateLogin');
const upload = require('../middleWares/fileUpload');

profileRoute
.get("/:userId", getLoginUser)
.patch("/edit-profile/:userId", [loginValidations, upload.single('photo')], updateUser);

module.exports = profileRoute;