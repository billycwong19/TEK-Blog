const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
// find all users
router.get('/', async (req, res) => {
    try {
    const users = await User.findAll()
    res.json(users)
    } catch {
    res.status(400).json(err)
    }
})
// find single user data by username (not implemented but tested through Insomnia)
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
// find single user and validate if user exists, then validate if password is correct, then create a session with user session data
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
// create a user then instantiate a session with the user logged in
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
// update user by ID (not implemented but tested through Insomnia)
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

// log out user destroys session created by login route or create route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
      console.log('logged out')
    });
  } else {
    res.status(404).end();
  }
});
// delete user
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
