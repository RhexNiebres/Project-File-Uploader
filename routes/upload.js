const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { ensureAuthenticated } = require("../middlewares/auth");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/multiple", ensureAuthenticated, upload.array("files", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    const uploadedFiles = req.files.map(file => ({
      filename: file.originalname,
      filetype: file.mimetype, // ✅ Add filetype (e.g., image/jpeg)
      filesize: file.size, // ✅ Add filesize (in bytes)
      filepath: file.path, // ✅ Save local path (or use Cloudinary URL if needed)
      userId: req.user.id,
    }));

    console.log("Uploaded Files:", uploadedFiles);

    // 🔥 Save files to database
    await prisma.file.createMany({
      data: uploadedFiles,
    });

    res.redirect("/");
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).send("Error uploading files");
  }
});


module.exports = router;
