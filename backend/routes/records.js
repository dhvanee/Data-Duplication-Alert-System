import express from 'express';
import mongoose from 'mongoose';
import ExcelJS from 'exceljs';
import Record from '../models/Record.js';

const router = express.Router();

// Get all records with duplicates
router.get('/duplicates', async (req, res) => {
  try {
    // Get match confidence from query params (default to 0.8)
    const matchConfidence = parseFloat(req.query.matchConfidence) || 0.8;
    
    // Get search query from query params
    const searchQuery = req.query.search || '';

    // Find all active records that are marked as duplicates
    const duplicates = await Record.find({
      status: 'active',
      isDuplicate: true,
      ...(searchQuery && {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { phone: { $regex: searchQuery, $options: 'i' } }
        ]
      })
    }).populate('duplicateOf');

    res.json({
      duplicates,
      totalDuplicates: duplicates.length,
      message: duplicates.length > 0 ? `Found ${duplicates.length} potential duplicates` : 'No duplicates found'
    });
  } catch (error) {
    console.error('Error fetching duplicates:', error);
    res.status(500).json({ 
      message: 'Failed to fetch duplicates',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all records
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    // Build query
    const query = {
      status: 'active',
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { phone: { $regex: search, $options: 'i' } }
        ]
      })
    };

    // Execute query with pagination
    const records = await Record.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    // Get total count
    const total = await Record.countDocuments(query);

    res.json({ 
      records,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ 
      message: 'Error fetching records',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Create a new record
router.post('/', async (req, res) => {
  try {
    const recordData = req.body;
    
    // Create new record
    const record = new Record(recordData);
    
    // Check for duplicates before saving
    const duplicates = await record.findDuplicates();
    if (duplicates.length > 0) {
      record.isDuplicate = true;
      record.duplicateOf = duplicates[0]._id;
      record.duplicateScore = duplicates[0].score;
    }

    await record.save();

    res.status(201).json({
      message: record.isDuplicate ? 'Record created and marked as potential duplicate' : 'Record created successfully',
      record,
      duplicates
    });
  } catch (error) {
    console.error('Error creating record:', error);
    res.status(500).json({ 
      message: 'Error creating record',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get duplicate detection rules
router.get('/rules', async (req, res) => {
  try {
    // For now, return default rules
    // TODO: Implement rules storage in database
    const rules = [
      {
        id: 'default',
        name: 'Default Rule',
        fields: ['name', 'email', 'phone'],
        matchThreshold: 0.8
      }
    ];
    
    res.json({ rules });
  } catch (error) {
    console.error('Error fetching rules:', error);
    res.status(500).json({ 
      message: 'Error fetching rules',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Update duplicate detection rules
router.post('/rules', async (req, res) => {
  try {
    const { rules } = req.body;
    
    // TODO: Implement saving rules to database
    res.json({
      message: 'Rules updated successfully',
      rules
    });
  } catch (error) {
    console.error('Error updating rules:', error);
    res.status(500).json({ 
      message: 'Error updating rules',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get a specific record
router.get('/:id', async (req, res) => {
  try {
    res.json({ message: `Get record ${req.params.id} endpoint` });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching record', error: error.message });
  }
});

// Update a record
router.put('/:id', async (req, res) => {
  try {
    res.json({ message: `Update record ${req.params.id} endpoint` });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
});

// Delete a record
router.delete('/:id', async (req, res) => {
  try {
    res.json({ message: `Delete record ${req.params.id} endpoint` });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting record', error: error.message });
  }
});

// Export records to Excel
router.get('/export', async (req, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Duplicate Records');

    // Define columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Duplicate Score', key: 'duplicateScore', width: 15 },
      { header: 'Created At', key: 'createdAt', width: 20 },
      { header: 'Status', key: 'status', width: 10 }
    ];

    // Style the header row
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' }
    };

    // Fetch all duplicate records
    const duplicates = await Record.find({ isDuplicate: true })
      .populate('duplicateOf')
      .lean();

    // Add data rows
    duplicates.forEach(record => {
      worksheet.addRow({
        id: record._id.toString(),
        name: record.name,
        email: record.email,
        phone: record.phone,
        duplicateScore: record.duplicateScore ? `${(record.duplicateScore * 100).toFixed(1)}%` : 'N/A',
        createdAt: record.createdAt ? new Date(record.createdAt).toLocaleDateString() : 'N/A',
        status: record.status
      });
    });

    // Set response headers
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=duplicate-records-${Date.now()}.xlsx`);

    // Write to response stream
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting records:', error);
    res.status(500).json({
      message: 'Error exporting records',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router; 