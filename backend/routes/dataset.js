const express = require('express');
const router = express.Router();
const Dataset = require('../models/Dataset');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs').promises;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Get all datasets with filtering and pagination
router.get('/', auth, async (req, res) => {
  try {
    const { department, fileType, startDate, endDate, search, page = 1, limit = 10 } = req.query;
    
    let query = {};
    
    if (department) query['metadata.department'] = department;
    if (fileType) query.fileType = fileType;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    if (search) {
      query.$text = { $search: search };
    }

    const datasets = await Dataset.find(query)
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Dataset.countDocuments(query);

    res.json({
      datasets,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching datasets', error: error.message });
  }
});

// Upload new dataset
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    const { name, description, department, tags, accessLevel } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Generate checksum
    const fileBuffer = await fs.readFile(file.path);
    const checksum = crypto.createHash('md5').update(fileBuffer).digest('hex');

    // Check for duplicates
    const existingDataset = await Dataset.findOne({ checksum });
    if (existingDataset) {
      await fs.unlink(file.path); // Delete uploaded file
      return res.status(409).json({
        message: 'Similar dataset already exists',
        existingDataset
      });
    }

    const dataset = new Dataset({
      name,
      description,
      fileType: path.extname(file.originalname).substring(1),
      size: file.size,
      location: file.path,
      checksum,
      uploadedBy: req.user.id,
      metadata: {
        department,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        accessLevel
      }
    });

    await dataset.save();
    res.status(201).json(dataset);
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({ message: 'Error uploading dataset', error: error.message });
  }
});

// Download dataset
router.get('/download/:id', auth, async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    // Update download history
    dataset.downloads.push({
      user: req.user.id,
      downloadedAt: new Date()
    });
    await dataset.save();

    res.download(dataset.location);
  } catch (error) {
    res.status(500).json({ message: 'Error downloading dataset', error: error.message });
  }
});

// Get dataset details
router.get('/:id', auth, async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id)
      .populate('uploadedBy', 'name email')
      .populate('downloads.user', 'name email');
    
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    res.json(dataset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching dataset', error: error.message });
  }
});

// Delete dataset
router.delete('/:id', auth, async (req, res) => {
  try {
    const dataset = await Dataset.findById(req.params.id);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    // Check if user has permission to delete
    if (dataset.uploadedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this dataset' });
    }

    // Delete file from storage
    await fs.unlink(dataset.location);
    
    // Delete dataset from database
    await dataset.remove();
    
    res.json({ message: 'Dataset deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting dataset', error: error.message });
  }
});

module.exports = router; 