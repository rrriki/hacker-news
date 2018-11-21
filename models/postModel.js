const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  objectID: { unique: true, index: true, type: String },
  created_at: Date,
  story_title: String,
  title: String,
  story_url: String,
  url: String,
  author: String,
  deleted: Boolean,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
