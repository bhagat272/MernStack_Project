require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const server = express();
const router = require("./routes/api");
const cors = require('cors');
const multer = require('multer');
const mongoose = require("mongoose");
const path = require('path');
const fs = require('fs'); // Required to ensure directory creation

// Middleware
server.use(express.json());
server.use(cors());

// Serve static files from /tmp/uploads in Vercel (only for testing or temporary use)
server.use('/uploads', express.static(path.join('/tmp', 'uploads')));

// Multer setup
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const uploadPath = path.join('/tmp', 'uploads');
    // Ensure the directory exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

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

server.get('/', (req, res) => {
  res.send("Backend");
});

// Example route for file upload
server.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file);
  res.send('File uploaded successfully!');
});

// Start server
server.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
