const {Post} = require("../mongo/entities/Post/Post-model.js");
const {Comment} = require("../mongo/entities/Comment/Comment-model.js");

const getComments = async (postId) => {
    console.log("POSTID ", postId);
    try {
        const post = await Post
        .findById(postId)
        .populate({
            path: "comments",
            populate: {
                path: "author",
                select: "_id fullName userName avatar"
            }
        });

        return post.comments;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {getComments};