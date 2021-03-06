const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// find all posts and include associated comments
router.get('/', async (req, res) => {
  try {
  const posts = await Post.findAll({
    include: [{ model: Comment }]
  })
  res.json(posts)
  } catch {
  res.status(400).json(err)
  }
})

// find a single post by ID
router.get('/:id', withAuth, async (req, res) => {
  try {
    const singlePost= await Post.findByPk(req.params.id, {
    });
    res.status(200).json(singlePost)
  } catch (err) {
    res.status(500).json(err);
  }
});
// create a post based with fetch req.body
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({ 
      ...req.body,
      user_id: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
      const [affectedRows] = await Post.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      // error handling to validate if an update has actually occured
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
// dele post based on ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(affectedRows)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
