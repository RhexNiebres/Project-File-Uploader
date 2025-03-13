const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/multiple", ensureAuthenticated, upload.array("files", 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("No files uploaded.");
    }

    console.log("Uploaded Files:", req.files);
    console.log("User ID:", req.user?.id);

    const uploadedFiles = await Promise.all(
      req.files.map((file) =>
        prisma.file.create({
          data: {
            filename: file.originalname,
            filetype: file.mimetype,
            filesize: file.size,
            filepath: file.path,
            userId: req.user.id, 
            folderId: null,
          },
        })
      )
    );

    console.log("Saved to Database:", uploadedFiles);
    res.redirect("/");
  } catch (error) {
    console.error("Multiple Upload Error:", error);
    res.status(500).send("Error uploading files");
  }
});

module.exports = router;
