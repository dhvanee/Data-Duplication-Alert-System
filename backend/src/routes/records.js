import express from 'express';
import { auth } from '../middleware/auth.js';
import Record from '../models/Record.js';

const router = express.Router();

// Get all records
router.get('/', auth, async (req, res) => {
  try {
    const records = await Record.find({ createdBy: req.user._id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching records', error: error.message });
  }
});

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