const mongoose = require('mongoose');
const itemSchema = mongoose.Schema({
  userDetails: Object,
  listOfBlogs: { type: Array, default: [] },
  // timestamps: true,
});

module.exports = mongoose.model('Item', itemSchema);
