const jwt = require("jsonwebtoken");

const createComment = async (parent, args, context, info) => {
    const {authToken, content, postId, replyTo} = args;
    const {Comment, User, Post, pubsub} = context;
    console.log("CREATE COMMENT CALLED");
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

        //pubsub.publish('commentAdded', "test string again") - works
        pubsub.publish('commentAdded', comment)
        console.log("pubsub publish fired");

        return comment;
    } catch (error) {
        return null;
    }
};

module.exports = {createComment};