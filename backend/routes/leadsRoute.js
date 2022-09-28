const express = require('express');
const leadsRoute = express.Router();
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { addLead, getLeads, getLeadById } = require('../controllers/leadsController.js');

leadsRoute
.post("/", addLead)
.get("/", adminMiddleware, getLeads)
.get("/:leadId", getLeadById)

module.exports = leadsRoute;