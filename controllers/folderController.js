const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createFolder = async (req, res) => {
  try {
    const folder = await prisma.folder.create({
      data: {
        name: req.body.name,
        userId: req.user.id,
      },
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error creating folder");
  }
};

exports.viewFolder = async (req, res) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { files: true },
    });

    if (!folder) {
      return res.status(404).send("Folder not found");
    }

    res.render("folder", { folder, user: req.user });
  } catch (error) {
    res.status(500).send("Error loading folder");
  }
};

exports.updateFolder = async (req, res) => {
  try {
    await prisma.folder.update({
      where: { id: parseInt(req.params.id) },
      data: { name: req.body.name },
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error updating folder");
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    await prisma.file.deleteMany({
      where: { folderId: parseInt(req.params.id) },
    });
    await prisma.folder.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Error deleting folder");
  }
};
