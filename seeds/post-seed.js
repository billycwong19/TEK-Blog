const Post = require('../models/post');

const postData = [
  {
    title:'HTML 5',
    post_body: 'HTML is very important. HTML 5 allows for inclusion and transparency.',
    user_id: 1,
    is_updated: 0,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;