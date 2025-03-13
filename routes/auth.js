const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);
router.get("/login", authController.getLogin);
router.post("/log-in", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" }));
router.get("/log-out", ensureAuthenticated, authController.logout);

module.exports = router;