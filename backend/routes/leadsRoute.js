const express = require('express');
const leadsRoute = express.Router();
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { addLead, getLeads, getLeadById, getLeadsByCounselorId, updateOneLead, deleteOneLead } = require('../controllers/leadsController.js');
const authenticateLogin = require('../middleWares/authenticateLogin');

leadsRoute
.post("/", authenticateLogin ,addLead)
.get("/", adminMiddleware, getLeads)
.get("/:leadId", authenticateLogin ,getLeadById)
.patch("/:leadId", authenticateLogin ,updateOneLead)
.delete("/:leadId", authenticateLogin ,deleteOneLead)
.get("/counselors/:counselorId", authenticateLogin ,getLeadsByCounselorId)

module.exports = leadsRoute;