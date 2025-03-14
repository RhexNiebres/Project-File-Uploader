const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary"); // Ensure correct path

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Change to your Cloudinary folder
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });

module.exports = upload;
