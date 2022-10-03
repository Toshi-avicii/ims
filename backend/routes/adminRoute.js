const express = require('express');
const mainUserRoute = express.Router();
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { adminProfile, updateAdmin } = require('../controllers/adminController.js');
const authenticateAdminToken = require('../middleWares/authenticateToken');

mainUserRoute
.get("/profile", adminMiddleware, authenticateAdminToken, adminProfile)
.patch("/profile", adminMiddleware, updateAdmin)
// .post("/profile", adminMiddleware, createAdmin)

module.exports = mainUserRoute;
