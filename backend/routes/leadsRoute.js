const express = require('express');
const leadsRoute = express.Router();
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { addLead, getLeads, getLeadById, getLeadsByCounselorId, updateOneLead, deleteOneLead } = require('../controllers/leadsController.js');

leadsRoute
.post("/", addLead)
.get("/", adminMiddleware, getLeads)
.get("/:leadId", getLeadById)
.patch("/:leadId", updateOneLead)
.delete("/:leadId", deleteOneLead)
.get("/counselors/:counselorId", getLeadsByCounselorId)

module.exports = leadsRoute;