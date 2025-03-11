require("dotenv").config();
const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const uploadRoutes = require("./routes/upload");
const folderRoutes = require("./routes/folder");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(
  session({ secret: "cats", resave: false, saveUninitialized: false })
);
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/", authRoutes);

app.use((req, res, next) => {// access various local variables throughout app
  res.locals.user = req.user || null;
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/upload", uploadRoutes);

app.use("/folders", folderRoutes);


app.listen(process.env.APP_PORT, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);
