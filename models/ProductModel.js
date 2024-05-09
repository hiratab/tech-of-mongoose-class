const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  created: Date,
});

module.exports = mongoose.model('Product', ProductSchema, 'product');
