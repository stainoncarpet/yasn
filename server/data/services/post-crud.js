const jwt = require("jsonwebtoken");
const util = require("util")

const { Post } = require("../mongo/entities/Post/Post-model.js");
const { User } = require("../mongo/entities/User/User-model.js");
const { Comment } = require("../mongo/entities/Comment/Comment-model.js");

const createPost = async (token, postTitle, postContent) => {
    try {
        const {id: userId} = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const post = await Post.create({
            dateOfPublication: new Date(),
            title: postTitle,
            content: postContent,
            author: userId
        });

        const user = await User.findById(userId);
        user.posts = [...user.posts, post];
        await user.save();

        return {_id: post._id,
                dateOfPublication: post.dateOfPublication, 
                author:  {
                    _id: user._id, 
                    fullName: user.fullName, 
                    userName: user.userName, 
                    avatar: user.avatar
                },
                title: post.title, 
                content: post.content, 
                comments: post.comments, 
                likers: post.likers, 
                dislikers: post.dislikers};
    } catch (error) {
        console.log(error);

        return null;
    }
};

const deletePost = async (token, postId) => {
    try {
        const {id: userId} = await util.promisify(jwt.verify)(token, process.env.JWT_SECRET);

        const postForRemoval = await Post.findById(postId).populate("author comments");

        // delete post reference in author and commentators
        const user = await User.findById(userId);

        // if the same user who created post
        if(postForRemoval.author._id.toString() === userId) {
            // DONE remove post from author
            user.posts = user.posts.filter((p) => {
                return p.toString() !== postId
            });
            await user.save();

            // DONE remove post from commenters
            if(postForRemoval.comments.length > 0) {
                const commenterIds = postForRemoval.comments.map((comment) => comment.author);
                const commenters = await User.find({_id: {$in: commenterIds}});
                
                for(let i = 0; i < commenters.length; i++) {
                    commenters[i].comments = commenters[i].comments.filter((comm) => !postForRemoval.comments.map((c) => c._id).includes(comm));
                    await commenters[i].save();
                }
            }

            // DONE remove post from likers
            if(postForRemoval.likers.length > 0) {
                const likers = await User.find({_id: {$in: postForRemoval.likers}});

                for(let i = 0; i < likers.length; i++) {
                    likers[i].likedPosts = likers[i].likedPosts.filter((eachLikedPostId) => {
                        return eachLikedPostId.toString() !== postId;
                    });
                    await likers[i].save();
                }
            }

            // DONE remove post from dislikers
            if(postForRemoval.dislikers.length > 0) {
                const dislikers = await User.find({_id: {$in: postForRemoval.dislikers}});

                for(let i = 0; i < dislikers.length; i++) {
                    dislikers[i].dislikedPosts = dislikers[i].dislikedPosts.filter((eachDislikedPostId) => eachDislikedPostId.toString() !== postId);
                    await dislikers[i].save();
                }
            }

            // DONE remove comments
            if(postForRemoval.comments.length > 0) {
                for (let i = 0; i < postForRemoval.comments.length; i++) {
                    //  from comment likers
                    const likers = await User.find({_id: {$in: postForRemoval.comments[i].likers}});

                    for (let j = 0; j < likers.length; j++) {
                        likers[j].likedComments = likers[j].likedComments
                                                            .filter((lc) => lc.toString() !== postForRemoval.comments[i]._id.toString());
                        await likers[j].save();
                    }

                    //  from comment dislikers
                    const dislikers = await User.find({_id: {$in: postForRemoval.comments[i].dislikers}});

                    for (let j = 0; j < dislikers.length; j++) {
                        dislikers[j].dislikedComments = dislikers[j].dislikedComments
                                                            .filter((dc) => dc.toString() !== postForRemoval.comments[i]._id.toString());
                        await dislikers[j].save();
                    }
                }
            }         

            // PENDING remove post from reposters

            await Comment.deleteMany({post: postId});
            await Post.findOneAndDelete({_id: postId});
        }

        return postForRemoval;
    } catch (error) {
        console.log(error);
        return null;
    }
};

// const getPost = async (parent, args, context, info) => {
//     const {Post} = context;
//     const {postId} = args;

//     const post = await Post.findById(postId).populate("comments");
//     console.log("GET COMMENTS RESOLVER CALLED FOR POST: ", postId);

//     try {
//         return post
//     } catch (error) {
//         return null;
//     }
// };

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

module.exports = { 
    createPost, 
    deletePost, 
    //getPost,
    getPosts
};