// routes/adminRoutes.js
const express = require('express');
const Admin = require('../model/AdminModel');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Admin Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin user
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If credentials are correct, send a success response
    res.status(200).json({ message: 'Login successful', admin });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
