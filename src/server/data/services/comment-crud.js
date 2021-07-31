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

// BUG - when a comment is deeted - post's comment count doesnt adjust
const deleteComment = async (authToken, commentId) => {
    try {
        const {id: commentatorId} = await util.promisify(jwt.verify)(authToken, process.env.JWT_SECRET);

        const comment = await Comment.findById(commentId);
        const user = await User.findById(commentatorId);

        if (user.comments.includes(commentId) && comment.author.toString() === commentatorId) {
            const post = await Post.findById(comment.post);

            post.comments = post.comments.filter((comment) => comment.toString() !== commentId);

            user.comments = user.comments.filter((comment) => comment.toString() !== commentId);

            user.likedComments = user.likedComments.filter((comment) => comment.toString() !== commentId);

            user.dislikedComments = user.dislikedComments.filter((comment) => comment.toString() !== commentId);

            deletedComment = await Comment.findByIdAndDelete(commentId);

            await post.save();
            await user.save();

            return deletedComment;
        } else {
            throw new Error("Comment's author and requester author didn't match");
        }
    } catch (error) {
        return null;
    }
};

module.exports = {createComment, deleteComment};