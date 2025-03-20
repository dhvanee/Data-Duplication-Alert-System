import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Update notification settings
router.post('/notifications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize notifications object if it doesn't exist
    if (!user.notifications) {
      user.notifications = {
        emailNotifications: true,
        duplicateAlerts: true,
        systemUpdates: true,
        activitySummary: false
      };
    }

    // Update only the provided setting
    const setting = Object.keys(req.body)[0];
    if (setting in user.notifications) {
      user.notifications[setting] = req.body[setting];
      await user.save();
      res.json({ message: 'Notification settings updated', settings: user.notifications });
    } else {
      res.status(400).json({ message: 'Invalid notification setting' });
    }
  } catch (error) {
    console.error('Error updating notification settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get notification settings
router.get('/notifications', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.notifications || {
      emailNotifications: true,
      duplicateAlerts: true,
      systemUpdates: true,
      activitySummary: false
    });
  } catch (error) {
    console.error('Error fetching notification settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 