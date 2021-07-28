const jwt = require("jsonwebtoken");
const util = require("util")

const { Post } = require("../mongo/entities/Post/Post-model.js");
const { User } = require("../mongo/entities/User/User-model.js");

const createPost = async (authToken, postTitle, postContent) => {
    try {

        const {id: userId} = await util.promisify(jwt.verify)(authToken, process.env.JWT_SECRET);

        const post = await Post.create({
            dateOfPublication: new Date(),
            title: postTitle,
            content: postContent,
            author: userId
        });

        const user = await User.findById(userId);
        user.posts = [...user.posts, post];
        await user.save();

        return {_id: post._id, author: {_id: user._id, avatar: user.avatar, fullName: user.fullName, userName: user.userName}, title: post.title, content: post.content, comments: post.comments, likers: post.likers, dislikers: post.dislikers};
    } catch (error) {
        console.log(error);

        return null;
    }
};

module.exports = { createPost };