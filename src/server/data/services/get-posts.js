const {Post} = require("../mongo/entities/Post/Post-model.js");

const getPosts = async (parent, args, context, info) => {
    console.log("GET POSTS?");
    try {
        const posts = await Post
            .find()
            .sort({ dateOfPublication: -1 })
            .populate("author", {_id: 1, fullName: 1, userName: 1, avatar: 1})
            .populate("comments")
            .populate("likers", {_id: 1})
            .populate("dislikers", {_id: 1})
            .populate("reposters", {_id: 1})

            console.log(posts);

        return posts;
    } catch (error) {
        console.log(error);
        return [];
    }
};

module.exports = {getPosts}