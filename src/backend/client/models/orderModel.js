const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Improves query speed for user orders
  },
  razorpayOrderId: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate order IDs
    index: true,
  },
  razorpayPaymentId: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true }); // Adds createdAt & updatedAt automatically

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
