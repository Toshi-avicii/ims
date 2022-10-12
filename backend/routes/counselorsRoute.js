const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors, addCounselor, deleteCounselors, getOneCounselor, updateCounselor } = require('../controllers/counselorsController');
const authenticateAdminToken = require('../middleWares/authenticateToken');
const { counselorValidations } = require('../validations/counselorValidations');


counselorsRoute.get("/", authenticateAdminToken ,getCounselors)
.post("/", authenticateAdminToken, counselorValidations, addCounselor)
.delete("/", authenticateAdminToken ,deleteCounselors);

counselorsRoute.get("/:counselorId", authenticateAdminToken, getOneCounselor)
.patch("/:counselorId", authenticateAdminToken, updateCounselor)

module.exports = counselorsRoute;