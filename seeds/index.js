const sequelize = require('../config/connection');
const seedUser = require('./user-seed');
const seedPost = require('./post-seed');
const seedComment = require('./comment-seed');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUser();
    await seedPost();
    await seedComment();
    process.exit(0);
};

seedAll();