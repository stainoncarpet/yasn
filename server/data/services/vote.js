const jwt = require("jsonwebtoken");
const util = require("util");

const {Post} = require("../mongo/entities/Post/Post-model.js");
const {Comment} = require("../mongo/entities/Comment/Comment-model.js");
const {User} = require("../mongo/entities/User/User-model.js");

const votePost = async (token, postId, voteResult) => {
    try {
        const {id: voterId} = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const voter = await User.findById(voterId);

        const post = await Post.findById(postId);

        const [likedPosts, dislikedPosts] = await processVote(post, voter.likedPosts, voter.dislikedPosts, postId, voterId, voteResult);
        
        voter.likedPosts = likedPosts;
        voter.dislikedPosts = dislikedPosts;

        await post.save();
        await voter.save();

        return {postId: post._id, likers: post.likers, dislikers: post.dislikers};    
    } catch (error) {
        console.log(error);

        return null;
    }
};

const voteComment = async (token, commentId, voteResult) => {
    try {
        const {id: voterId} = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const voter = await User.findById(voterId);

        const comment = await Comment.findById(commentId);

        const [likedComments, dislikedComments] = await processVote(comment, voter.likedComments, voter.dislikedComments, commentId, voterId, voteResult);
        
        voter.likedComments = likedComments;
        voter.dislikedComments = dislikedComments;

        await comment.save();
        await voter.save();

        return {commentId: comment._id, postId: comment.post, likers: comment.likers, dislikers: comment.dislikers};    
    } catch (error) {
        console.log(error);

        return null;
    }
};

const processVote = async (entity, oldLikedEntities, oldDislikedEntities, entityId, userId, voteResult) => {
    let likedEntities = oldLikedEntities;
    let dislikedEntities = oldDislikedEntities;

    // liking 2nd time = unlike
    if(entity.likers.includes(userId) && voteResult == 1) {
        entity.likers = entity.likers.filter((likerId) => likerId.toString().trim() !== userId.toString().trim());
        likedEntities = likedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
    // revoting for the opposite
    } else if (entity.likers.includes(userId) && voteResult == -1) {
        entity.likers = entity.likers.filter((likerId) => likerId.toString().trim() !== userId.toString().trim());
        entity.dislikers = [...entity.dislikers, userId];
        likedEntities = likedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
        dislikedEntities = [...dislikedEntities, entityId];
    // revoting for the opposite
    } else if (entity.dislikers.includes(userId) && voteResult == 1){
        entity.dislikers = entity.dislikers.filter((dislikerId) => dislikerId.toString().trim() !== userId.toString().trim());
        entity.likers = [...entity.likers, userId];
        dislikedEntities = dislikedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
        likedEntities = [...dislikedEntities, entityId];
    // disliking 2nd time = undislike
    } else if (entity.dislikers.includes(userId) && voteResult == -1) {
        entity.dislikers = entity.dislikers.filter((dislikerId) => dislikerId.toString().trim() !== userId.toString().trim());
        dislikedEntities = dislikedEntities.filter((oldEntityId) => oldEntityId.toString().trim() !== entityId.toString().trim());
    // voting for the first time on post
    } else  {
        if (voteResult == 1) {
            entity.likers = [...entity.likers, userId];
            likedEntities = [...likedEntities, entityId]
        } else if (voteResult == -1) {
            entity.dislikers = [...entity.dislikers, userId];
            dislikedEntities = [...dislikedEntities, entityId]
        }
    }

    return [likedEntities, dislikedEntities];
};

module.exports = {voteComment, votePost, processVote};