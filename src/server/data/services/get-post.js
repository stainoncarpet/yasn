const getPost = async (parent, args, context, info) => {
    const {Post} = context;
    const {postId} = args;

    const post = await Post.findById(postId).populate("comments");
    console.log("GET COMMENTS RESOLVER CALLED FOR POST: ", postId);

    try {
        return post
    } catch (error) {
        return null;
    }
};

module.exports = {getPost};