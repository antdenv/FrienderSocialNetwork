const sequelize = require('../dbConfig');
const {DataTypes} = require('sequelize');

const PostModel = sequelize.define('posts', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    desc: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    likes: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },
}, {timestamps: true});

module.exports = PostModel;