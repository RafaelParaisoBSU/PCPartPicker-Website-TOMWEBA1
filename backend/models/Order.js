const mongoose = require('mongoose');

// Schema for individual items in an order
const OrderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String }
});

// Main order schema
const OrderSchema = new mongoose.Schema({
  // Array of ordered products
  items: { type: [OrderItemSchema], required: true },
  // Total order amount
  total: { type: Number, required: true },
  // Customer information
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  // Order status tracking
  status: { type: String, default: 'ordered' }
}, {
  timestamps: true // Auto-add createdAt and updatedAt
});

module.exports = mongoose.model('Order', OrderSchema);