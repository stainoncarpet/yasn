const jwt = require("jsonwebtoken");

const {Post} = require("../mongo/entities/Post/Post-model.js");
const {Comment} = require("../mongo/entities/Comment/Comment-model.js");
const {User} = require("../mongo/entities/User/User-model.js");

const {processVote} = require("../services/process-vote.js");

const votePost = async (parent, args, context, info) => {
    try {
        const {authToken, postId, voteResult} = args;

        const {id: voterId} = jwt.verify(authToken, process.env.JWT_SECRET);

        const voter = await User.findById(voterId);

        const post = await Post.findById(postId);

        const [likedPosts, dislikedPosts] = await processVote(post, voter.likedPosts, voter.dislikedPosts, postId, voterId, voteResult);
        
        voter.likedPosts = likedPosts;
        voter.dislikedPosts = dislikedPosts;

        await post.save();
        await voter.save();

        console.log("VOTED POST ", post);

        return post;    
    } catch (error) {
        console.log(error);

        return null;
    }
};

const voteComment = async (parent, args, context, info) => {
    try {
        const {authToken, commentId, voteResult} = args;

        const {id: voterId} = jwt.verify(authToken, process.env.JWT_SECRET);

        const voter = await User.findById(voterId);

        const comment = await Comment.findById(commentId);

        const [likedComments, dislikedComments] = await processVote(comment, voter.likedComments, voter.dislikedComments, commentId, voterId, voteResult);
        
        voter.likedComments = likedComments;
        voter.dislikedComments = dislikedComments;

        await comment.save();
        await voter.save();

        console.log("VOTED COMMENT ", comment);

        return comment;
    } catch (error) {
        console.log(error);

        return null;
    }
};



module.exports = {voteComment, votePost};