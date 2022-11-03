const express = require('express');
const { moveToTrash, recoverFromTrash, deletePermanently, getTrashLeadsByPage } = require('../controllers/leadsTrashController');
const leadsTrashRoute = express.Router();

leadsTrashRoute
.post('/:leadId', moveToTrash)
.get('/pages/:page', getTrashLeadsByPage)
.post('/recover/:leadId', recoverFromTrash)
.delete('/:leadId', deletePermanently)
module.exports = leadsTrashRoute;