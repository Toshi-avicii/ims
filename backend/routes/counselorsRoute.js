const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors, addCounselor } = require('../controllers/counselorsController');
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { counselorValidations } = require('../validations/counselorValidations');


counselorsRoute.get("/", adminMiddleware ,getCounselors);
counselorsRoute.post("/", adminMiddleware, counselorValidations, addCounselor);

module.exports = counselorsRoute;