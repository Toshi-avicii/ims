const express = require('express');
const leadsRoute = express.Router();
const { adminMiddleware } = require('../middleWares/userMiddleware');
const { addLead, getLeads, getLeadById, getLeadsByCounselorId, updateOneLead, deleteOneLead, getLeadsByPage, getFilteredLeads } = require('../controllers/leadsController.js');
const authenticateLogin = require('../middleWares/authenticateLogin');

leadsRoute
.post("/", authenticateLogin ,addLead)
.get("/", authenticateLogin, getLeads)
.post("/filters/pages/:page", getFilteredLeads)
.get('/pages/:page?', authenticateLogin, getLeadsByPage)
.get("/:leadId", authenticateLogin ,getLeadById)
.patch("/:leadId", authenticateLogin ,updateOneLead)
.delete("/:leadId", authenticateLogin ,deleteOneLead)
.get("/counselors/:counselorId", authenticateLogin ,getLeadsByCounselorId)

module.exports = leadsRoute;