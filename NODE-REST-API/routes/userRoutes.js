const router = require("express").Router();
const bcrypt = require('bcrypt');
const { Sequelize } = require("../dbConfig");
const UserModel = require('../models/userModel');

// update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (error) {
                return res.status(500).json(error);
            }
        }

        try {
            const user = await UserModel.findOne({where: {id: req.params.id}});
            user.update(req.body);
            res.status(200).json('account has been updated');
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json('you can update only your account');
    }
});

// delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await UserModel.destroy({where: {id: req.params.id}});
            res.status(200).json('account has been deleted');
        } catch (error) {
            return res.status(500).json(error);
        }
    } else {
        return res.status(403).json('you can delete only your account');
    }
});

// get user
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const login = req.query.login;
    try {
        const user = userId 
        ? await UserModel.findOne({where: {id: userId}}) 
        : await UserModel.findOne({where: {login: login}});
        const {password, updatedAt, ...other} = user.dataValues;
        res.status(200).json(other);
    } catch(error) {
        res.status(500).json(error);
    }
});

// get friends
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await UserModel.findOne({where: {id: req.params.userId}});
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return UserModel.findOne({where: {id: friendId}});
            })
        );
        let friendList = [];
        friends.map(friend => {
            const {id, username, profilePicture, login} = friend;
            friendList.push({id, username, profilePicture, login});
        });
        res.status(200).json(friendList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get followers
router.get('/followers/:userId', async (req, res) => {
    try {
        const user = await UserModel.findOne({where: {id: req.params.userId}});
        const followers = await Promise.all(
            user.followers.map(followerId => {
                return UserModel.findOne({where: {id: followerId}});
            })
        );
        let followerList = [];
        followers.map(follower => {
            const {id, username, profilePicture, login} = follower;
            followerList.push({id, username, profilePicture, login});
        });
        res.status(200).json(followerList);
    } catch (error) {
        res.status(500).json(error);
    }
});

// follow user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await UserModel.findOne({where: {id: req.params.id}});
            const currentUser = await UserModel.findOne({where: {id: req.body.userId}});
            if (!user.followers.includes(parseInt(req.body.userId))) {
                await user.update(
                    {followers: Sequelize.fn('array_append', Sequelize.col('followers'), req.body.userId)}
                );
                await currentUser.update(
                    {followings: Sequelize.fn('array_append', Sequelize.col('followings'), req.params.id)}
                );
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json('you already follow this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('you can\'t follow yourself');
    }
});

// unfollow user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await UserModel.findOne({where: {id: req.params.id}});
            const currentUser = await UserModel.findOne({where: {id: req.body.userId}});
            if (user.followers.includes(parseInt(req.body.userId))) {
                await user.update(
                    {followers: Sequelize.fn('array_remove', Sequelize.col('followers'), req.body.userId)}
                );
                await currentUser.update(
                    {followings: Sequelize.fn('array_remove', Sequelize.col('followings'), req.params.id)}
                );
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json('you already unfollow this user');
            }
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(403).json('you can\'t unfollow yourself');
    }
});

module.exports = router;