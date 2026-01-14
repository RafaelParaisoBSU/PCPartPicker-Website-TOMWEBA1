const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const jwt = require('jsonwebtoken');
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// GET user's build
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('build email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return the build object, or empty object if no build exists
    res.json(user.build || {});
  } catch (error) {
    console.error('Error fetching build:', error);
    res.status(500).json({ message: 'Error fetching build', error: error.message });
  }
});

// POST/UPDATE a complete build
router.post('/', verifyToken, async (req, res) => {
  try {
    const { build } = req.body;

    if (!build) {
      return res.status(400).json({ message: 'Build data is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { build },
      { new: true }
    ).select('build');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Build saved successfully', build: user.build });
  } catch (error) {
    console.error('Error saving build:', error);
    res.status(500).json({ message: 'Error saving build', error: error.message });
  }
});

// UPDATE a single component in the build
router.put('/:component', verifyToken, async (req, res) => {
  try {
    const { component } = req.params;
    const { item } = req.body;

    // Validate component type
    const validComponents = ['cpu', 'cooler', 'motherboard', 'ram', 'storage', 'gpu', 'psu', 'case', 'monitor'];
    if (!validComponents.includes(component.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid component type' });
    }

    const updateObj = {};
    updateObj[`build.${component.toLowerCase()}`] = item || null;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateObj,
      { new: true }
    ).select('build');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `${component} updated successfully`, build: user.build });
  } catch (error) {
    res.status(500).json({ message: 'Error updating build', error: error.message });
  }
});

// DELETE a component from the build
router.delete('/:component', verifyToken, async (req, res) => {
  try {
    const { component } = req.params;

    const validComponents = ['cpu', 'cooler', 'motherboard', 'ram', 'storage', 'gpu', 'psu', 'case', 'monitor'];
    if (!validComponents.includes(component.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid component type' });
    }

    const updateObj = {};
    updateObj[`build.${component.toLowerCase()}`] = null;

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateObj,
      { new: true }
    ).select('build');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: `${component} removed successfully`, build: user.build });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting component', error: error.message });
  }
});

module.exports = router;
