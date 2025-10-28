const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  image: { type: String }
});

const OrderSchema = new mongoose.Schema({
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true }
  },
  status: { type: String, default: 'ordered' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);
