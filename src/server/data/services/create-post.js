const jwt = require("jsonwebtoken");

const { Post } = require("../mongo/entities/Post/Post-model.js");
const { User } = require("../mongo/entities/User/User-model.js");

const createPost = async (parent, args, context, info) => {
    try {
        const { authToken, postTitle, postContent } = args;

        const {id: userId} = jwt.verify(authToken, process.env.JWT_SECRET);

        const post = await Post.create({
            dateOfPublication: new Date(),
            title: postTitle,
            content: postContent,
            author: userId
        });

        const user = await User.findById(userId);
        user.posts = [...user.posts, post];
        await user.save();

        return post;
    } catch (error) {
        console.log(error);

        return null;
    }
};

module.exports = { createPost }