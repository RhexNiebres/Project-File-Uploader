const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth");
const fileController = require("../controllers/fileController");

router.get("/:fileId", ensureAuthenticated, fileController.viewFile);

router.post("/upload", ensureAuthenticated, fileController.uploadFile); 

router.get("/:fileId/download", ensureAuthenticated, fileController.downloadFile);//frustrating

router.post("/:fileId/delete", ensureAuthenticated, fileController.deleteFile);
module.exports = router;
