const express = require("express");
const router = express.Router();
const passport = require("passport");
const authController = require("../controllers/authController");

router.get("/sign-up", authController.getSignUp);
router.post("/sign-up", authController.postSignUp);
router.get("/login", authController.getLogin);
router.post("/log-in", passport.authenticate("local", { successRedirect: "/", failureRedirect: "/" }));
router.get("/log-out", authController.logout);

module.exports = router;