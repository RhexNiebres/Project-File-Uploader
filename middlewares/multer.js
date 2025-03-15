const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); 

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", 
    allowed_formats: ["jpg", "png", "jpeg", "gif", "pdf", "doc", "docx", "txt", 
      "mp4", "avi", "mov", "webm"]
  },
});

const upload = multer({ storage });

module.exports = upload;
