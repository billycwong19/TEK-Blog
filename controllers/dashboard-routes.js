const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  // try {
    // const postData = await Post.findAll({
    //   where: {
    //     userId: req.session.userId,
    //   },
    // });

    // const posts = postData.map((post) => post.get({ plain: true }));
    // if (req.session.loggedIn) {
    res.render('user-dashboard', {
      layout: 'dashboard',
    });
  // } else {
    console.log("you could not log in homie")
  // }
  // } catch (err) {
  //   res.redirect('login');
  // }
});

// router.get('/new', withAuth, (req, res) => {
//   res.render('new-post', {
//     layout: 'dashboard',
//   });
// });

// router.get('/edit/:id', withAuth, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);

//     if (postData) {
//       const post = postData.get({ plain: true });

//       res.render('edit-post', {
//         layout: 'dashboard',
//         post,
//       });
//     } else {
//       res.status(404).end();
//     }
//   } catch (err) {
//     res.redirect('login');
//   }
// });

module.exports = router;