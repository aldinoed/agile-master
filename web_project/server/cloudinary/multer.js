// multerConfig.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'perusahaan', // Folder di Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg']
  }
});

const parser = multer({ storage: storage });

module.exports = parser;