const { addMessageToConversation, markMessagesAsRead } = require("../../data/services/user-crud.js")


const userNamespaceListeners = (rootNamespace, profileNamespace, userNamespace, userDictionary) => {
    userNamespace.on('connection', (socket) => {
        socket.on('action', async (action) => {
            const { payload: { senderToken, readerToken, messageIds, conversationId, messageContent } } = action;

            switch (action.type) {
                case "user/server/conversation/message/send":
                    try {
                        const [newMessage, participantsIds] = await addMessageToConversation(senderToken, conversationId, messageContent);

                        if (newMessage) {
                            const onlineUsersIds = Object.values(userDictionary);
                            const socketIds = Object.keys(userDictionary);

                            for (let i = 0; i < participantsIds.length; i++) {
                                const stringifiedPId = participantsIds[i].toString();

                                if (onlineUsersIds.includes(stringifiedPId)) {
                                    const ind = onlineUsersIds.indexOf(stringifiedPId);
                                    const socketRoom = socketIds[ind];

                                    rootNamespace.to(socketRoom).emit('action', { type: 'user/client/conversation/message/receive', payload: { conversationId, newMessage } });
                                }
                            }
                        } else { console.log("can't emit new message") }
                    } catch (error) {
                        console.log(error);
                    }

                    break;
                case "user/server/conversation/message/read":
                    try {
                        const { readerId, participantIds } = await markMessagesAsRead(readerToken, conversationId, messageIds);

                        if (readerId) {
                            const onlineUsersIds = Object.values(userDictionary);
                            const socketIds = Object.keys(userDictionary);

                            for (let i = 0; i < participantIds.length; i++) {
                                const stringifiedPId = participantIds[i].toString();

                                if (onlineUsersIds.includes(stringifiedPId)) {
                                    const ind = onlineUsersIds.indexOf(stringifiedPId);
                                    const socketRoom = socketIds[ind];

                                    rootNamespace.to(socketRoom).emit('action', { type: 'user/client/conversation/message/read', payload: { readerId, messageIds, conversationId } });
                                }
                            }
                        } else { console.log("can't emit new message") }
                    } catch (error) {
                        console.log(error);
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