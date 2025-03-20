const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

// Register a new user
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

// Get current authenticated user
router.get('/me', requireAuth, authController.getAuthUser);

module.exports = router;