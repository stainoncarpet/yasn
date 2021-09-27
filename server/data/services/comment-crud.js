const jwt = require("jsonwebtoken");
const util = require("util");

const { Comment } = require("../mongo/entities/Comment/Comment-model.js");
const { User } = require("../mongo/entities/User/User-model.js");
const { Post } = require("../mongo/entities/Post/Post-model.js");
const { Notification } = require("../mongo/entities/Notification/Notification-model.js");

const createComment = async (authToken, content, postId, replyTo) => {
    try {
        const { id: commentatorId } = await util.promisify(jwt.verify)(authToken, process.env.JWT_SECRET);

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

        const commentator = await User.findById(commentatorId);
        commentator.comments = [...commentator.comments, comment];
        await commentator.save();

        const post = await Post.findById(postId);
        post.comments = [...post.comments, comment];
        await post.save();

        if(commentatorId != post.author) {
            const postAuthor = await User.findById(post.author);
            const notificationForPostAuthor = await Notification.create({
                type: "post-commented",
                dateOfCreation: new Date(),
                isRead: false,
                owner: post.author,
                content: JSON.stringify([{
                    type: "link",
                    href: `/profile/${commentator.userName.toLowerCase()}`,
                    anchor: commentator.userName + " "
                }, {
                    type: "text",
                    content: "commented on your post"
                }
                ]),
            });
            postAuthor.notifications = [...postAuthor.notifications, notificationForPostAuthor._id]
            await postAuthor.save();
        }

        return {
            replyTo: comment.replyTo, likers: comment.likers, dislikers: comment.dislikers, _id: comment._id,
            dateOfPublication: comment.dateOfPublication, content: comment.content,
            author: { _id: commentator._id, fullName: commentator.fullName, userName: commentator.userName, avatar: commentator.avatar },
            postId: post._id, __v: comment.__v
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteComment = async (authToken, commentId) => {
    try {
        const { id: commentatorId } = await util.promisify(jwt.verify)(authToken, process.env.JWT_SECRET);

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

// const getCommentAuthor = async (parent, args, context, info) => {
//     const user = await User.findById(parent.author);

//     try {
//         return {id: user._id, fullName: user.fullName, userName: user.userName, avatar: user.avatar};
//     } catch (error) {
//         return null;
//     }
// };

module.exports = { 
    createComment, 
    deleteComment, 
    getComments, 
    //getCommentAuthor 
};