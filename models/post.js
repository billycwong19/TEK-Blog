const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model {}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true, 
        },
        title: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        is_updated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        sequelize,
        // timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
);

module.exports = Post