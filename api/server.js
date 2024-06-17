require('dotenv').config(); // Load environment variables from .env file
const express = require("express");
const server = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Middleware
server.use(express.json());
server.use(cors());

// Multer Local Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = './uploads';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Serve static files in the 'uploads' directory
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route for basic confirmation
server.get('/', (req, res) => {
  res.status(200).send('Server is running successfully');
});

// Example route for uploading files
server.post('/upload', upload.single('file'), (req, res) => {
  try {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    res.status(200).send({
      message: "File uploaded successfully",
      fileUrl: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}` // URL to access the uploaded file
    });
  } catch (error) {
    res.status(500).send({ message: "Error uploading file", error });
  }
});

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
