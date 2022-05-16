const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');

router.get('/', async (req, res) => {
    try {
    const users = await User.findAll()
    res.json(users)
    } catch {
    res.status(400).json(err)
    }
})

router.get('/:username', async (req, res) => {
  try {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  res.json(user)
  } catch {
  res.status(400).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'No user account found!' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
    try {
      const updatedUser = await User.update(
        {
          username: req.body.username,
          password: req.body.password
        },
        {
          where: {
            id: req.params.id,
          },
        });
        req.session.save(() => {
          req.session.useId = updatedUser.id;
          req.session.username = updatedUser.username;
          req.session.loggedIn = true;
    
          res.json(updatedUser);
        });
    } catch (err) {
    res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log('it logged out')
    });
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!userData) {
      res.status(404).json({ message: 'No User with this ID' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
