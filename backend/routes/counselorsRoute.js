const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors, addCounselor, deleteCounselors, getOneCounselor, updateCounselor } = require('../controllers/counselorsController');
const authenticateAdminToken = require('../middleWares/authenticateToken');
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { counselorValidations } = require('../validations/counselorValidations');


counselorsRoute.get("/", adminMiddleware, authenticateAdminToken ,getCounselors)
.post("/", adminMiddleware, counselorValidations, addCounselor)
.delete("/", adminMiddleware ,deleteCounselors);

counselorsRoute.get("/:counselorId", adminMiddleware, getOneCounselor)
.patch("/:counselorId", adminMiddleware, updateCounselor)

module.exports = counselorsRoute;