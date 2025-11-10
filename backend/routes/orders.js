const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try {
    const { items, total, customer } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Order must include at least one item' });
    }
    if (typeof total !== 'number') {
      return res.status(400).json({ error: 'Total must be a number' });
    }
    if (!customer || !customer.name || !customer.email || !customer.address) {
      return res.status(400).json({ error: 'Customer information is required' });
    }

    const order = new Order({ items, total, customer });
    const saved = await order.save();
    return res.status(201).json({ success: true, order: saved });
  } catch (err) {
    console.error('Error saving order:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Invalid order data',
        details: Object.values(err.errors).map(e => e.message)
      });
    }
    if (err.name === 'MongoServerError' && err.code === 11000) {
      return res.status(409).json({ error: 'Duplicate order' });
    }
    return res.status(500).json({ 
      error: 'Failed to save order',
      details: err.message
    });
  }
});

module.exports = router;
