// import models
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
// post comment and user associations
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Post, {
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete:'CASCADE'
})

Post.hasMany(Comment, {
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})

User.hasMany(Comment, {
})

module.exports = {
User,
Post,
Comment
};
