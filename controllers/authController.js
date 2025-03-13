const bcrypt = require("bcryptjs");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLogin = (req, res) => {
  res.render("login");
};

exports.getSignUp = (req, res) => {
  res.render("signup");
};

exports.postSignUp = async (req, res, next) => {
  try {
    const { firstname, lastname, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).send("Username already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        password: hashedPassword, 
      },
    });

    res.redirect("/");
  } catch (err) {
    return next(err);
  }
};

exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
};