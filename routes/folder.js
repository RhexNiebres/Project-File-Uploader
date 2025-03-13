const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth");
const folderController = require("../controllers/folderController");
const fileController = require("../controllers/fileController");

router.post("/create", ensureAuthenticated, folderController.createFolder);
router.get("/:id", ensureAuthenticated, folderController.viewFolder);
router.post("/update/:id", ensureAuthenticated, folderController.updateFolder);
router.post("/delete/:id", ensureAuthenticated, folderController.deleteFolder);
router.post("/:id/upload", ensureAuthenticated, fileController.uploadFile);

router.get(
  "/:folderId/file/:fileId",
  ensureAuthenticated,
  fileController.viewFile
);
router.get(
  "/:folderId/file/:fileId/download",
  ensureAuthenticated,
  fileController.downloadFile
);

router.post("/:folderId/file/:fileId/delete", ensureAuthenticated, fileController.deleteFile);


module.exports = router;
