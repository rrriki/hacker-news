const Post = require('../models/postModel');

const index = async (req, res) => {
  const formats = {
    lastDay: '[Yesterday]',
    sameDay: 'h:hh a',
    nextDay: 'MMM DD',
    lastWeek: 'MMM DD',
    nextWeek: 'MMM DD',
    sameElse: 'MMM DD',
  };

  try {
    const posts = await Post.find({ deleted: false }).sort({ created_at: -1 });
    res.render('index', { posts, formats });
  } catch (error) {
    res.render('error', { message: 'Error', error: { status: 'Error fetching data', stack: error } });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(`Deleting Post: ${id}`);
  try {
    // Mark as deleted instead of removing it, to avoid adding it back on next refresh
    const doc = await Post.findOneAndUpdate({ objectID: id }, { deleted: true });
    if (!doc) {
      res.status(404).send();
    } else { res.status(200).send(); }
  } catch (error) {
    console.log(`Error deleting Post: ${id}`);
    res.status(500).send();
  }
};

module.exports = {
  index,
  deletePost,
};
