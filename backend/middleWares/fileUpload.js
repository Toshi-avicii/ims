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

module.exports = upload;