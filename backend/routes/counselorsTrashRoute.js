const express = require('express');
const { moveToTrash, getTrashedData, deletePermanently, recoverFromTrash } = require('../controllers/counselorsTrashController');
const counselorsTrashRoute = express.Router();

counselorsTrashRoute
.post("/:counselorId", moveToTrash)
.get("/pages/:page", getTrashedData)
.delete("/:counselorId", deletePermanently)
.post("/recover/:counselorId", recoverFromTrash)

module.exports = counselorsTrashRoute;