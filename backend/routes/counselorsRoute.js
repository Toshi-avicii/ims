const express = require('express');
const counselorsRoute = express.Router();
const { getCounselors, addCounselor, deleteCounselors, getOneCounselor, updateCounselor,getCounselorsByPage } = require('../controllers/counselorsController');
const authenticateAdminToken = require('../middleWares/authenticateToken');
const authenticateLogin = require('../middleWares/authenticateLogin')
const { counselorValidations } = require('../validations/counselorValidations');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'images/');
    },
    filename: function(req, file, cb) {
      cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});
  
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
  
let upload = multer({ storage, fileFilter });

counselorsRoute.get("/", authenticateAdminToken ,getCounselors)
.post("/", [authenticateAdminToken, upload.single('photo')], counselorValidations, addCounselor)
.delete("/", authenticateAdminToken ,deleteCounselors)
.get('/pages/:page', authenticateLogin, getCounselorsByPage);

counselorsRoute.get("/:counselorId", authenticateAdminToken, getOneCounselor)
.patch("/:counselorId", authenticateAdminToken, updateCounselor)

module.exports = counselorsRoute;