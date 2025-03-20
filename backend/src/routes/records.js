import express from 'express';
import multer from 'multer';
import { auth } from '../middleware/auth.js';
import * as XLSX from 'xlsx';
import { Record } from '../models/Record.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload data
router.post('/upload', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const records = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    await Record.insertMany(records);

    res.json({ message: 'File uploaded successfully', count: records.length });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

// Export data
router.get('/export', auth, async (req, res) => {
  try {
    const records = await Record.find({});
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Records');

    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=ddas-export-${Date.now()}.xlsx`);
    res.send(buffer);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ message: 'Error exporting data', error: error.message });
  }
});

// Get duplicates
router.get('/duplicates', auth, async (req, res) => {
  try {
    const records = await Record.find({});
    const duplicates = findDuplicates(records);
    res.json(duplicates);
  } catch (error) {
    console.error('Duplicates error:', error);
    res.status(500).json({ message: 'Error fetching duplicates', error: error.message });
  }
});

// Get all records
router.get('/', auth, async (req, res) => {
  try {
    const records = await Record.find({});
    res.json(records);
  } catch (error) {
    console.error('Records error:', error);
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
});

// Helper function to find duplicates
function findDuplicates(records) {
  const duplicates = [];
  const seen = new Map();

  records.forEach(record => {
    const key = generateDuplicateKey(record);
    if (seen.has(key)) {
      duplicates.push({
        original: seen.get(key),
        duplicate: record
      });
    } else {
      seen.set(key, record);
    }
  });

  return duplicates;
}

// Helper function to generate duplicate key
function generateDuplicateKey(record) {
  // Customize this based on your duplicate detection criteria
  return `${record.name?.toLowerCase()}-${record.email?.toLowerCase()}`;
}

// Add new record
router.post('/', auth, async (req, res) => {
  try {
    const record = new Record({
      ...req.body,
      createdBy: req.user._id
    });
    await record.save();
    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error creating record', error: error.message });
  }
});

// Check for duplicates
router.post('/check-duplicates', auth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    // Find potential duplicates based on email or phone
    const potentialDuplicates = await Record.find({
      createdBy: req.user._id,
      $or: [
        { email },
        { phone },
        { name: { $regex: new RegExp(name, 'i') } }
      ]
    });

    res.json(potentialDuplicates);
  } catch (error) {
    res.status(500).json({ message: 'Error checking duplicates', error: error.message });
  }
});

// Update record status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      { status },
      { new: true }
    );
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: 'Error updating record status', error: error.message });
  }
});

// Delete record
router.delete('/:id', auth, async (req, res) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id
    });
    
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
});

export default router; 