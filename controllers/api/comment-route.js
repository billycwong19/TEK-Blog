const router = require('express').Router();
const { Comment, User, Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
  const comments = await Comment.findAll({
    include: [{ model: User }],
  })
  res.json(comments)
  } catch {
  res.status(400).json(err)
  }
})

router.get('/:id', withAuth, async (req, res) => {
  try {
    const singleComment = await Comment.findByPk(req.params.id, {
      include: [{ model: Post }, { model: User }],
    });
    res.status(200).json(singleComment)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create(
      {
      ...req.body,
      user_id: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).json('ALL GOOD!').end()
    } else {
      res.status(404).json('COMMENT NOT FOUND!').end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const affectedRows = Comment.destroy({
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
