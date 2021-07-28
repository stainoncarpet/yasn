const jwt = require("jsonwebtoken");
const util = require("util");

const {Comment} = require("../mongo/entities/Comment/Comment-model.js");
const {User} = require("../mongo/entities/User/User-model.js");
const {Post} = require("../mongo/entities/Post/Post-model.js");

const createComment = async (authToken, content, postId, replyTo) => {
    try {
        const {id: commentatorId} = await util.promisify(jwt.verify)(authToken, process.env.JWT_SECRET);

        const chassis = {
            dateOfPublication: new Date(),
            content,
            author: commentatorId,
            post: postId,
            replyTo,
            likers: [],
            dislikers: []
        }

        const comment = await Comment.create(chassis);

        const user = await User.findById(commentatorId);
        user.comments = [...user.comments, comment];
        await user.save();

        const post = await Post.findById(postId);
        post.comments = [...post.comments, comment];
        await post.save();

        return {replyTo: comment.replyTo, likers: comment.likers, dislikers: comment.dislikers, _id: comment._id, 
            dateOfPublication: comment.dateOfPublication, content: comment.content, 
            author: {_id: user._id, fullName: user.fullName, userName: user.userName, avatar: user.avatar},
            postId: post._id, __v: comment.__v
        };
    } catch (error) {
        return null;
    }
};

module.exports = {createComment};