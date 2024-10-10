const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // Product name is required
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0 // Price must be a positive number
    },
    category: {
      type: String,
      required: true,
      enum: ['Normal pillow','Luxury pillow'] // Limited to specific categories
    },
    stock: {
      type: Number,
      required: true,
      min: 0 // Stock must be a positive number or zero
    },
    image: {
      type: String, 
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create the product model
  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;