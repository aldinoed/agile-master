// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  secure: true
});

// Log the configuration
console.log(cloudinary.config());

module.exports = cloudinary;