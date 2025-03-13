const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth"); 
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", ensureAuthenticated, async (req, res) => {
  try {
      const folders = await prisma.folder.findMany({
          where: { userId: req.user?.id }
      });

      const files = await prisma.file.findMany({
        where: { userId: req.user.id, folderId: null }, 
        orderBy: { createdAt: "desc" } 
      });
      res.render("index", { user: req.user, folders, files }); 
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
});

module.exports = router;
