require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("./config/passport");
const authRoutes = require("./routes/auth");
const indexRoutes = require("./routes/index");
const uploadRoutes = require("./routes/upload");
const folderRoutes = require("./routes/folder");
const fileRoutes = require("./routes/file");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// (async function() {
//   try {
//     // Example of uploading a single file
//     const result = await cloudinary.uploader.upload('./uploads/1741896868275-adobo.webp');
//     console.log('Upload result:', result);

//     // Get the URL of the uploaded file
//     const url = cloudinary.url(result.public_id, {
//       transformation: [
//         { fetch_format: 'auto' },
//         { quality: 'auto' },
//         { width: 1200, height: 1200 },
//       ],
//     });

//     console.log('File URL:', url);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// })();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/", authRoutes);
app.use("/folders", folderRoutes);
app.use("/file", fileRoutes);
app.use("/files", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/upload", uploadRoutes);

app.use((req, res, next) => {
  // access various local variables throughout app
  res.locals.user = req.user || null;
  next();
});

app.listen(process.env.APP_PORT, () =>
  console.log(`App listening on port ${process.env.APP_PORT}!`)
);
