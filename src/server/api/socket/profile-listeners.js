const { voteComment, votePost } = require("../../data/services/vote");
const { createPost, deletePost } = require("../../data/services/post-crud.js");
const { createComment, deleteComment } = require("../../data/services/comment-crud.js");

const profileNamespaceListeners = (postsNamespace) => {
    const currentUsers = {};
    let count = 0;

    postsNamespace.on("connection", (socket) => {
        console.log("client socket connected /posts namespace ", socket.id);
        count++;

        socket.on("check-in-user-profile-room", async ({ userName }) => {

            // unsubscribe socket if already in a room
            if (currentUsers[socket.id]) {
                socket.leave(`profile-room-${currentUsers[socket.id]}`);
            }

            currentUsers[socket.id] = userName;
            socket.join(`profile-room-${userName}`);

            //console.log("rooms: ", socket.adapter.rooms);
            //console.log("count: ", currentUsers);
        });

        /*socket.on("check-out-user-profile-room", async ({ userName }) => {
            console.log("check out???");

            socket.leave(`profile-room-${currentUsers[socket.id]}`);
            delete currentUsers[socket.id];
            count--;

            console.log("rooms: ", socket.adapter.rooms);
            console.log("count: ", currentUsers);
        });*/

        socket.on('action', async (action) => {
            const { payload: { token, postId, commentId, result, postTitle, postContent, commentContent, replyTo } } = action;

            switch (action.type) {
                case "profile/server/vote/post":
                    const postVoteResult = await votePost(token, postId, result);

                    if (postVoteResult) {
                        postsNamespace.emit('action', { type: 'profile/client/vote/post', voteResult: postVoteResult });
                    } else {
                        postsNamespace.emit('action', { type: 'profile/client/vote/post', voteResult: null });
                    }

                    break;
                case "profile/server/create/post":
                    const post = await createPost(token, postTitle, postContent);

                    // temporary solution - notify all connected clients
                    // Later - find user's friends and notify each

                    if (post) {
                        const roomName = `profile-room-${post.author.userName.toLowerCase()}`;
                        console.log("ROOM NAME ", roomName);

                        postsNamespace
                            .to(roomName)
                            .emit('action', { type: 'profile/client/create/post', post: post });
                    } else {
                        postsNamespace
                            .to(roomName)
                            .emit('action', { type: 'profile/client/create/post', post: null });
                    }

                    break;
                case "profile/server/create/comment":
                    // token, commentContent, postId, replyTo
                    const comment = await createComment(token, commentContent, postId, replyTo);

                    if (comment) {
                        postsNamespace.emit('action', { type: 'profile/client/create/comment', comment: comment });
                    } else {
                        postsNamespace.emit('action', { type: 'profile/client/create/comment', post: null });
                    }

                    break;
                case "profile/server/vote/comment":
                    const commentVoteResult = await voteComment(token, commentId, result);

                    if (commentVoteResult) {
                        postsNamespace.emit('action', { type: 'profile/client/vote/comment', voteResult: commentVoteResult });
                    } else {
                        postsNamespace.emit('action', { type: 'profile/client/vote/comment', voteResult: null });
                    }
                    break;
                case "profile/server/delete/comment":
                    const deletedComment = await deleteComment(token, commentId);

                    if (deletedComment) {
                        postsNamespace.emit('action', { type: 'profile/client/delete/comment', deletedComment: deletedComment });
                    } else {
                        postsNamespace.emit('action', { type: 'profile/client/delete/comment', deletedComment: null });
                    }

                    break;
                case "profile/server/delete/post":
                    console.log("profile/server/delete/post");

                    const deletedPost = await deletePost(token, postId);

                    if (deletedPost) {
                        const roomName = `profile-room-${deletedPost.author.userName.toLowerCase()}`;

                        postsNamespace
                            .to(roomName)
                            .emit('action', { type: 'profile/client/delete/post', deletedPost: deletedPost });
                    } else {
                        postsNamespace
                            .to(roomName)
                            .emit('action', { type: 'profile/client/delete/post', deletedPost: null });
                    }

                    break;
                default: console.log("default switch in posts namespace: ", action)
            }
        });

        socket.on('disconnect', function () {
            console.log("client socket disconnected from /posts", socket.id);

            socket.leave(`profile-room-${currentUsers[socket.id]}`);
            delete currentUsers[socket.id];
            count--;

            //console.log("Current user count: ", count);
            //console.log("rooms: ", socket.adapter.rooms);
            //console.log("count: ", currentUsers);
        });
    });
};

module.exports = profileNamespaceListeners