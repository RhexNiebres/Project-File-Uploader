# 📂 UploadEase

**UploadEase** is a simple file management application that allows users to:  
✅ Securely upload files using `Multer` and store them in `Cloudinary`  
✅ Authenticate users with `Passport.js`, `Bcrypt`, and `PostgreSQL`  
✅ Manage uploaded files with delete and download options  
✅ Store user and file metadata in `PostgreSQL`

## 🚀 Features

- **User Authentication**: Secure login & signup with `passport.js` and `bcrypt`
- **Upload Files**: Store files locally using `Multer` before uploading to `Cloudinary`
- **Delete Files**: Remove uploaded files from Cloudinary
- **Download Files**: Retrieve uploaded files
- **Database Storage**: PostgreSQL to store user credentials and file metadata
- **Templating Engine**: `EJS` for dynamic HTML rendering
- **User-Friendly Interface**: Clean and simple UI

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS
- **Authentication**: Passport.js, Bcrypt
- **Storage**: Multer (local) & Cloudinary (cloud storage)
- **Database**: PostgreSQL (via Prisma or Sequelize)
