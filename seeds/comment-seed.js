const Comment = require('../models/comment');

const commentData = [
  {
    post_id: 1,
    comment_body:'HTML is great stuff! Thanks for this post!',
    user_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;