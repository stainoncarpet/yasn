const {Comment} = require("../mongo/entities/Comment/Comment-model.js");
const {User} = require("../mongo/entities/User/User-model.js");
const {Post} = require("../mongo/entities/Post/Post-model.js");
const jwt = require("jsonwebtoken");

const createComment = async (parent, args, context, info) => {
    console.log("CREATE COMMENT CALLED: ", args);
    const {authToken, content, postId, replyTo} = args;

    try {
        const {id: commentatorId} = jwt.verify(authToken, process.env.JWT_SECRET);

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

        return comment;
    } catch (error) {
        return null;
    }
};

module.exports = {createComment};