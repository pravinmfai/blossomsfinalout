const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  price: {
    type: Number,
    required: true,
    min: 0, // Ensures price is non-negative
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'], 
    default: 'percentage',
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  discountAmount: {
    type: Number,
    min: 0,
    default: 0,
  },
  color: {
    type: [String], 
    default: [],
  },
  material: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], // Standardized sizes
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true,
    index: true, // Optimizes searches by category
  },
  tags: {
    type: [String], 
    default: [],
    index: true, // Optimizes searches by tags
  },
  imageUrl: {
    type: [String], // Allows multiple images
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
