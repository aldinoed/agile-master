// cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'djtsgyima',
  api_key: 'wphT4pkzGjAdDPAYPVnhcsPDw4Y',
  api_secret: 'wphT4pkzGjAdDPAYPVnhcsPDw4Y'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'goship', // Folder di Cloudinary
      allowedFormats: ['jpg', 'png', 'jpeg']
    }
  });
  
  const parser = multer({ storage: storage });

module.exports = parser;