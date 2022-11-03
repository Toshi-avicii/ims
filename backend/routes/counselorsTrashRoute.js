const express = require('express');
const { moveToTrash, getTrashedData } = require('../controllers/counselorsTrashController');
const counselorsTrashRoute = express.Router();

counselorsTrashRoute
.post("/:counselorId", moveToTrash)
.get("/pages/:page", getTrashedData)

module.exports = counselorsTrashRoute;