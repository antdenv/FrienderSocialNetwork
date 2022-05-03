const sequelize = require('../dbConfig');
const {DataTypes} = require('sequelize');

const UserModel = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    profilePicture: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    coverPicture: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    followers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },
    followings: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    desc: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    city: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    from: {
        type: DataTypes.STRING,
        defaultValue: "",
    },
    relationship: {
        type: DataTypes.INTEGER,
    }
}, {timestamps: true});

module.exports = UserModel;