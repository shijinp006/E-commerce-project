const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String, // This will store the path to the image file
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);