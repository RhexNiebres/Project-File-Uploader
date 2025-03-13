const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const upload = require("../middlewares/multer");
const path = require("path");
const fs = require("fs");

exports.getAllFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany(); 
    res.render("files", { files, user: req.user });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).send("Error fetching files");
  }
};

exports.viewFile = async (req, res) => {
  try {
    console.log("Request received for file:", req.params.fileId);

    const file = await prisma.file.findUnique({
      where: { id: parseInt(req.params.fileId) },
    });

    if (!file) {
      console.log("File not found in database");
      return res.status(404).send("File not found");
    }

    console.log("File found:", file);
    
    res.render("file-details", { 
      file, 
      user: req.user, 
      folderId: file.folderId || null 
    });
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).send("Error fetching file details");
  }
};


// controllers/fileController.js

exports.downloadFile = async (req, res, next) => {
  try {
    const { fileId, folderId } = req.params; // Extract fileId and folderId from params

    // Find the file using the provided fileId
    const file = await prisma.file.findUnique({
      where: { id: parseInt(fileId) },
    });

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Check if file belongs to the folder (if folderId exists)
    if (folderId && file.folderId !== parseInt(folderId)) {
      return res.status(400).send("File is not in the specified folder");
    }

    // Construct file path
    const filePath = path.join(__dirname, "../", file.filepath.replace(/\\/g, "/"));

    // Serve the file for download
    res.download(filePath, file.filename, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        return res.status(500).send("Error downloading file");
      }
    });
  } catch (error) {
    console.error("Error in file download controller:", error);
    return res.status(500).send("Internal server error");
  }
};


exports.uploadFile = (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) return res.status(400).send(err.message);

    try {
      if (!req.file) {
        console.log("No file detected");
        return res.status(400).send("No file uploaded");
      }

      console.log("Uploaded File:", req.file);
      console.log("User ID:", req.user?.id);

      const folderId = req.params.id ? parseInt(req.params.id) : null;

      if (folderId) {
        const folder = await prisma.folder.findUnique({
          where: { id: folderId },
        });
        if (!folder) return res.status(404).send("Folder not found");
      }
      
      const newFile = await prisma.file.create({
        data: {
          filename: req.file.originalname,
          filetype: req.file.mimetype,
          filesize: req.file.size,
          filepath: req.file.path, 
          userId: req.user.id, 
          folderId: folderId,
        },
      });

      res.redirect(folderId ? `/folders/${folderId}` : "/");
    } catch (error) {
      console.error("Upload Error:", error);
      res.status(500).send("Error uploading file");
    }
  });
};

exports.deleteFile = async (req, res) => {
  const { fileId, folderId } = req.params;

  try {
    // Find the file by its ID
    const file = await prisma.file.findUnique({
      where: { id: parseInt(fileId) },
    }); 

    if (!file) {
      return res.status(404).send("File not found");
    }

    // Delete the file from the file system
    const filePath = path.join(__dirname, "../", file.filepath.replace(/\\/g, "/"));
    fs.unlinkSync(filePath); // Synchronously delete the file

    // Delete the file from the database
    await prisma.file.delete({
      where: { id: parseInt(fileId) },
    });

    // If file belongs to a folder, redirect to the folder; otherwise, redirect to home
    if (folderId) {
      return res.redirect(`/folders/${folderId}`);
    } else {
      return res.redirect("/"); // Redirect to home if no folderId
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Error deleting file");
  }
};