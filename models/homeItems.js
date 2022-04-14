const mongoose = require('mongoose');
const homeItemsSchema = mongoose.Schema({
  blogTitle: String,
  category: String,
  image: String,
  content: String,
  publishedDate: String,
});

module.exports = mongoose.model('homeItem', homeItemsSchema);
