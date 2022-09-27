const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors } = require('../controllers/counselorsController');
const { adminMiddleware } = require('../middleWares/userMiddleware');

counselorsRoute.get("/", adminMiddleware ,getCounselors);

module.exports = counselorsRoute;