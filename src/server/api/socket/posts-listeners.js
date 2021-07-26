const {voteComment, votePost} = require("../../data/services/vote");

const postsNamespaceListeners = (postsNamespace) => {
    postsNamespace.on("connection", (socket) => {
        console.log("client socket connected /posts namespace ", socket.id);
        
        socket.on('action', async (action) => {
            const {payload: {token, postId, commentId, result}} = action;

            switch (action.type) {
                case "posts/server/vote/post":
                    const postVoteResult = await votePost(token, postId, result);

                    if(postVoteResult) {
                        postsNamespace.emit('action', { type: 'posts/client/vote/post', voteResult: postVoteResult });
                    } else {
                        postsNamespace.emit('action', { type: 'posts/client/vote/post', voteResult: null });
                    }

                    break;
                case "posts/server/vote/comment":
                    console.log("comment vote listener, ", action);
                    const commentVoteResult = await voteComment(token, commentId, result);
    
                    if(commentVoteResult) {
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