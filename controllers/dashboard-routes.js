const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');
// /dashboard/ route to find all posts based on session userId
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
      include: [{ all: true, nested: true}]
    });


    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    const username = req.session.username
    const loggedIn = req.session.loggedIn
    // passes data to be rendered in the view 'user-dashboard' with the layout 'dashboard'
    if (loggedIn) {
    res.render('user-dashboard', {
      layout: 'dashboard',
      posts,
      username,
      loggedIn
    });
  } 
  } catch (err) {
    res.redirect('login');
  }
});
// renders new-post view when /dashboard/new-post is queried
router.get('/new-post', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// edit post page rendered with associated post data to be edited.
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;