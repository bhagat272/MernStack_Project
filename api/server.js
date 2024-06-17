require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const server = express();
const router = require("./routes/api");
const cors = require('cors');
const multer = require('multer');
const mongoose = require("mongoose");
const path = require('path');

// Middleware
server.use(express.json());
server.use(cors());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


// mongoose
//   .connect("mongodb://127.0.0.1:27017/project_mern")
//   .then(() => {
//     console.log("connected to database");
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// MongoDB connection using environment variable
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });

// Use routes
server.use(router);

// Start server

server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
