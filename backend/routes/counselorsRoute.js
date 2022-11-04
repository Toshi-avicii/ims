const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors, addCounselor, deleteCounselors, getOneCounselor, updateCounselor,getCounselorsByPage } = require('../controllers/counselorsController');
const authenticateAdminToken = require('../middleWares/authenticateToken');
const authenticateLogin = require('../middleWares/authenticateLogin')
const { counselorValidations } = require('../validations/counselorValidations');
const upload = require('../middleWares/fileUpload');

// change it from "authenticateLogin" to "authenticateAdminToken"
counselorsRoute.get("/", authenticateLogin ,getCounselors)
.post("/", [authenticateLogin, upload.single('photo')], counselorValidations, addCounselor)
.delete("/", authenticateLogin ,deleteCounselors)
.get('/pages/:page', authenticateLogin, getCounselorsByPage)
.get("/:counselorId", authenticateLogin, getOneCounselor)
.patch("/:counselorId", authenticateLogin, updateCounselor)

module.exports = counselorsRoute;