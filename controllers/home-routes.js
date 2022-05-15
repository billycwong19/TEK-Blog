const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const { beforeDestroy } = require('../models/user');
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

// // get single post
// router.get('/post/:id', async (req, res) => {
//   try {
//   const postData = await Post.findByPk(req.params.id,
//   {
//     include: [{ model: User }, { model: Comment }]
//   },
//   )
//   const post = postData.get({ plain: true });

//   res.render('single-post',{
//     ...post,
//   });
//   res.status(200)
// } catch {
//   res.status(500)
// }
// });
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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }

  res.render('sign-up');
});

module.exports = router;
