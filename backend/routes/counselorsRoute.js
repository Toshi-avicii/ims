const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors, addCounselor, deleteCounselors } = require('../controllers/counselorsController');
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { counselorValidations } = require('../validations/counselorValidations');


counselorsRoute.get("/", adminMiddleware ,getCounselors);
counselorsRoute.post("/", adminMiddleware, counselorValidations, addCounselor);
counselorsRoute.delete("/", adminMiddleware ,deleteCounselors);


module.exports = counselorsRoute;