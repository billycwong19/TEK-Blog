const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const { beforeDestroy } = require('../models/user');


// get all posts for homepage
// router.get('/', async (req, res) => {
//     try {
    //   // Get all projects and JOIN with user data
    //   const postData = await Post.findAll({
    //     include: [
    //       {
    //         model: User,
    //         attributes: ['username'],
    //       }
    //     ],
    //   });
    //   // Serialize data so the template can read it
    //   const posts = postData.map((post) => post.get({ plain: true }));
    //   const loggedIn = req.session.loggedIn
      // Pass serialized data and session flag into template

  //     res.render('home',{
  
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

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
router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('home');
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
