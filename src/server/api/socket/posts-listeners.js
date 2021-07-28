const { voteComment, votePost } = require("../../data/services/vote");
const { createPost } = require("../../data/services/create-post.js");
const { createComment } = require("../../data/services/create-comment.js");

const postsNamespaceListeners = (postsNamespace) => {
    postsNamespace.on("connection", (socket) => {
        console.log("client socket connected /posts namespace ", socket.id);

        socket.on('action', async (action) => {
            const { payload: { token, postId, commentId, result, postTitle, postContent, commentContent, replyTo } } = action;

            switch (action.type) {
                case "posts/server/vote/post":
                    const postVoteResult = await votePost(token, postId, result);

                    if (postVoteResult) {
                        postsNamespace.emit('action', { type: 'posts/client/vote/post', voteResult: postVoteResult });
                    } else {
                        postsNamespace.emit('action', { type: 'posts/client/vote/post', voteResult: null });
                    }

                    break;
                case "posts/server/create/post":
                    const post = await createPost(token, postTitle, postContent);

                    // temporary solution - notify all connected clients
                    // Later - find user's friends and notify each

                    if (post) {
                        postsNamespace.emit('action', { type: 'posts/client/create/post', post: post });
                    } else {
                        postsNamespace.emit('action', { type: 'posts/client/create/post', post: null });
                    }

                    break;
                case "posts/server/create/comment":
                    // token, commentContent, postId, replyTo
                    const comment = await createComment(token, commentContent, postId, replyTo);

                    if (comment) {
                        postsNamespace.emit('action', { type: 'posts/client/create/comment', comment: comment });
                    } else {
                        postsNamespace.emit('action', { type: 'posts/client/create/comment', post: null });
                    }

                    break;
                case "posts/server/vote/comment":
                    const commentVoteResult = await voteComment(token, commentId, result);

                    if (commentVoteResult) {
                        postsNamespace.emit('action', { type: 'posts/client/vote/comment', voteResult: commentVoteResult });
                    } else {
                        postsNamespace.emit('action', { type: 'posts/client/vote/comment', voteResult: null });
                    }
                    break;
                default: console.log("default switch in posts namespace: ", action)
            }
        });

        socket.on('disconnect', function (socket) {
            console.log("client socket disconnected from /posts");
        });
    });
};

module.exports = postsNamespaceListeners