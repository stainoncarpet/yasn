const { requestFriendship, cancelFriendship, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest, addMessageToConversation } = require("../../data/services/user-crud.js")

const userNamespaceListeners = (userNamespace) => {
    userNamespace.on('connection', (socket) => {
        console.log("client socket connected to /user socket server ", socket.id);

        socket.on('action', async (action) => {
            console.log("ACTION ", action);
            const { payload: { userName, senderToken, accepterToken, cancelerToken, fshipId, conversationId, messageContent, rejecterToken, withdrawerToken } } = action;

            switch (action.type) {
                case "user/server/send/frequest":
                    console.log("friend request sent");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    await requestFriendship(userName, senderToken);

                    break;
                case "user/server/cancel/friendship":
                    console.log("friend cancellation triggered");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    await cancelFriendship(fshipId, cancelerToken);

                    break;
                case "user/server/accept/frequest":
                    console.log("friend friend request accepted");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    await acceptFriendRequest(fshipId, accepterToken);

                    break;
                case "user/server/reject/frequest":
                    console.log("reject friend request");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    await rejectFriendRequest(fshipId, rejecterToken);

                    break;
                case "user/server/withdraw/frequest":
                    console.log("withdraw friend request");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    await withdrawFriendRequest(fshipId, withdrawerToken);

                    break;
                case "user/server/conversation/message/send":
                    console.log("conversation message send");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    const result = await addMessageToConversation(senderToken, conversationId, messageContent);

                    break;
                default: console.log("default switch in root namespace: ", action)
            }
        });

        socket.on('disconnect', function (socket) {
            console.log("client socket disconnected from /users");
        });
    });
};

module.exports = userNamespaceListeners;