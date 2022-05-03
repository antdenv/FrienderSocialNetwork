const PostModel = require("../models/postModel");
const { Sequelize } = require("../dbConfig");
const UserModel = require("../models/userModel");

const router = require("express").Router();

// create post
router.post('/', async (req, res) => {
    try {
        const newPost = await PostModel.create(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update post
router.put('/:id', async (req, res) => {
    try {
        const post = await PostModel.findOne({where: {id: req.params.id}});
        if (post.userId == req.body.userId) {
            await post.update(req.body);
            res.status(200).json('post has been updated');
        } else {
            res.status(403).json('you can update only your post');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete post
router.delete('/:id', async (req, res) => {
    try {
        console.log(req.body.userId);
        const post = await PostModel.findOne({where: {id: req.params.id}});
        if (post.userId == req.body.userId) {
            await post.destroy({where: {userId: req.body.userId}});
            res.status(200).json('post has been deleted');
        } else {
            res.status(403).json('you can delete only your post');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// like/dislike a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await PostModel.findOne({where: {id: req.params.id}});
        if (!post.likes.includes(parseInt(req.body.userId))) {
            await post.update(
                {likes: Sequelize.fn('array_append', Sequelize.col('likes'), req.body.userId)}
            );
            res.status(200).json('post has been liked');
        } else {
            await post.update(
                {likes: Sequelize.fn('array_remove', Sequelize.col('likes'), req.body.userId)}
            );
            res.status(200).json('post has been disliked');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get a post
router.get('/:id', async (req,res) => {
    try {
        const post = await PostModel.findOne({where: {id: req.params.id}});
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get timeline posts 
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await UserModel.findOne({where: {id: req.params.userId}});
        const userPosts = await PostModel.findAll({where: {userId: currentUser.id}});
        const friendsPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return PostModel.findAll({where: {userId: friendId}})
            })
        );
        res.status(200).json(userPosts.concat(...friendsPosts));
    } catch (error) {
        res.status(500).json(error);
    }
});

// get user posts 
router.get('/profile/:login', async (req, res) => {
    try {
        const user = await UserModel.findOne({where: {login: req.params.login}});
        const posts = await PostModel.findAll({where: {userId: user.id}});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;