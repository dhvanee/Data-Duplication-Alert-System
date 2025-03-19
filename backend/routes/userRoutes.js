const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');

// Apply auth middleware to all routes
router.use(requireAuth);

// Get all users (admin only)
router.get('/', requireAdmin, userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Update user
router.put('/:id', userController.updateUser);

// Add user (admin only)
router.post('/', requireAdmin, userController.addUser);

module.exports = router;