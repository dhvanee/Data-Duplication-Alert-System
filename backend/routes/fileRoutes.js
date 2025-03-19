const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fileController = require('../controllers/fileController');
const { requireAuth } = require('../middleware/authMiddleware');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Apply auth middleware to all routes
router.use(requireAuth);

// Upload a file
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Check for duplicates before uploading
router.post('/check-duplicates', upload.single('file'), fileController.checkForDuplicates);

// Get all files
router.get('/', fileController.getAllFiles);

// Get file by ID
router.get('/:id', fileController.getFileById);

// Download a file
router.get('/:id/download', fileController.downloadFile);

// Get user's downloaded files
router.get('/user/downloads', fileController.getUserDownloads);

module.exports = router;