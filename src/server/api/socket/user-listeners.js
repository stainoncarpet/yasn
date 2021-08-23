const { requestFriendship, cancelFriendship, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest, addMessageToConversation } = require("../../data/services/user-crud.js")

const userNamespaceListeners = (rootNamespace, profileNamespace, userNamespace, userDictionary) => {
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
                    const [newMessage, participantsIds] = await addMessageToConversation(senderToken, conversationId, messageContent);

                    if(newMessage){
                        const onlineUsersIds = Object.values(userDictionary);
                        const socketIds = Object.keys(userDictionary);

                        for (let i = 0; i < participantsIds.length; i++) {
                            const stringifiedPId = participantsIds[i].toString();
                            if(onlineUsersIds.includes(stringifiedPId)) {
                                const ind = onlineUsersIds.indexOf(stringifiedPId);
                                const socketRoom = socketIds[ind];

                                rootNamespace
                                    .to(socketRoom)
                                    .emit('action', { 
                                        type: 'user/client/conversation/message/receive', 
                                        payload: {conversationId, newMessage} 
                                    })
                                ;
                            }
                        }
                    } else {
                        console.log("can't emit new message");
                    }

                    break;
                default: console.log("default switch in root namespace: ", action)
            }
        });

        socket.on('disconnect', function () {
            console.log("client socket disconnected from /users");
        });
    });
};

module.exports = userNamespaceListeners;