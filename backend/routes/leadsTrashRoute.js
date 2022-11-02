const express = require('express');
const { moveToTrash, recoverFromTrash, deletePermanently, getTrashLeadsByPage } = require('../controllers/trashController');
const leadsTrashRoute = express.Router();

leadsTrashRoute
.get('/pages/:page', getTrashLeadsByPage)
.post('/leads/:leadId', moveToTrash)
.post('/:leadId', recoverFromTrash)
.delete('/:leadId', deletePermanently)
module.exports = leadsTrashRoute;