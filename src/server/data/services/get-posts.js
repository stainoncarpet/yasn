// const {Post} = require("../mongo/entities/Post/Post-model.js");
const {User} = require("../mongo/entities/User/User-model.js");

const getPosts = async (userName) => {

    try {
        /*const posts = await Post
            .find({})
            .select("_id comments likers dislikers reposters dateOfPublication title content author")
            .sort({ dateOfPublication: -1 })
            .populate("author", {_id: 1, fullName: 1, userName: 1, avatar: 1})
            //.populate("comments")
            //.populate("likers", {_id: 1})
            //.populate("dislikers", {_id: 1})
            //.populate("reposters", {_id: 1})
        ;*/

        const user = await User.findOne({userName: { '$regex': new RegExp(['^', userName, '$'].join(""), 'i') }})
                    .populate({
                        path: "posts",
                        options: {
                            sort: {
                                dateOfPublication: -1
                            }
                        },
                        populate: {
                            path: "author",
                            select: "_id fullName userName avatar",
                        }
                    })
                    
        return user.posts;
    } catch (error) {
        console.log(error);
        return [];
    }
};

module.exports = {getPosts}