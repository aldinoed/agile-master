const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/srv1091-files.hstgr.io/3f90c77e6e79376b/files/public_html/images/logo_perusahaan/'); // Direktori untuk menyimpan file yang diupload
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang diupload
  }
});

const upload = multer({ storage: storage });

module.exports = upload;