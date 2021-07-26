const {voteComment, votePost} = require("../../data/services/vote");

const postsNamespaceListeners = (postsNamespace) => {
    postsNamespace.on("connection", (socket) => {
        console.log("client socket connected /posts namespace ", socket.id);
        
        socket.on('action', async (action) => {
            switch (action.type) {
                case "posts/server/vote":
                    const {payload: {token, postId, result}} = action;
                    const voteResult = await votePost(token, postId, result);

                    if(voteResult) {
                        postsNamespace.emit('action', { type: 'posts/client/vote', voteResult });
                    } else {
                        postsNamespace.emit('action', { type: 'posts/client/vote', voteResult: null });
                    }

                    //console.log("posts/server/vote socket fired", action);
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