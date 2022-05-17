const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');


// get all posts for homepage
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{model: User}],
      });
      const loggedIn = req.session.loggedIn
      const posts = postData.map((post) => post.get({ plain: true }))
      res.render('home',{
        posts,
        loggedIn
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // login page handlebars render
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});
// sign-up page handlebars render
router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('sign-up');
});

// grab single-post by id and render to page
router.get('/single-post/:id', async (req, res) => {
  try {
  const postData = await Post.findByPk(req.params.id,
  {
    include: [{ all: true, nested: true}]
  },
  )
  const post = postData.get({ plain: true });
  const loggedIn = req.session.loggedIn
  res.render('single-post',{
    ...post,
    loggedIn
  });
  res.status(200)
} catch {
  res.status(500)
}
});

// homepage if logged in
router.get('/', withAuth, (req, res) => {
  const loggedIn = req.session.loggedIn
  if (loggedIn) {
  res.render('home', {
    layout: 'dashboard',
  });
  return;
} else {
  res.redirect('/')
}
});


module.exports = router;
