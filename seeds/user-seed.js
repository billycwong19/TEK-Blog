const User = require('../models/user');

const userData = [
  {
    username:'billywong',
    password: 'password'
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
