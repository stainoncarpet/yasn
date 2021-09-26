const { addMessageToConversation, markMessagesAsRead, justDetermineParticipants } = require("../../../data/services/user-crud.js")


const userNamespaceListeners = (rootNamespace, profileNamespace, userNamespace, userDictionary) => {
    userNamespace.on('connection', (socket) => {
        socket.on('action', async (action) => {
            const { payload: { messageIds, conversationId, messageContent } } = action;
            const token = socket.handshake.headers.cookie.split('=')[1];

            switch (action.type) {
                case "user/server/conversation/message/send":
                    try {
                        const [newMessage, participantsIds] = await addMessageToConversation(token, conversationId, messageContent);

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
                        const { readerId, participantIds } = await markMessagesAsRead(token, conversationId, messageIds);

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
                case "user/server/conversation/message/start-typing":
                    try {
                        const { typingUser, participantIds } = await justDetermineParticipants(token, conversationId);

                        if (typingUser) {
                            const onlineUsersIds = Object.values(userDictionary);
                            const socketIds = Object.keys(userDictionary);

                            for (let i = 0; i < participantIds.length; i++) {
                                const stringifiedPId = participantIds[i].toString();

                                if (onlineUsersIds.includes(stringifiedPId) && stringifiedPId != typingUser._id) {
                                    const ind = onlineUsersIds.indexOf(stringifiedPId);
                                    const socketRoom = socketIds[ind];

                                    rootNamespace.to(socketRoom).emit('action', { type: 'user/client/conversation/message/start-typing', payload: { typingUser, conversationId } });
                                }
                            }
                        } else { console.log("can't emit new message") }
                    } catch (error) {
                        console.log(error);
                    }

                    break;
                case "user/server/conversation/message/stop-typing":
                    try {
                        const { typingUser, participantIds } = await justDetermineParticipants(token, conversationId);

                        if (typingUser) {
                            const onlineUsersIds = Object.values(userDictionary);
                            const socketIds = Object.keys(userDictionary);

                            for (let i = 0; i < participantIds.length; i++) {
                                const stringifiedPId = participantIds[i].toString();

                                if (onlineUsersIds.includes(stringifiedPId) && stringifiedPId != typingUser._id) {
                                    const ind = onlineUsersIds.indexOf(stringifiedPId);
                                    const socketRoom = socketIds[ind];

                                    rootNamespace.to(socketRoom).emit('action', { type: 'user/client/conversation/message/stop-typing', payload: { typingUser, conversationId } });
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