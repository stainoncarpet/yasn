const {requestFriendship} = require("../../data/services/user-crud.js")

const userNamespaceListeners = (userNamespace) => {
    userNamespace.on('connection', (socket) => {
        console.log("client socket connected to /user socket server ", socket.id);

        socket.on('action', async (action) => {
            console.log("ACTION ", action);
            const {payload: {userName, senderToken}} = action;

            switch (action.type) {
                case "user/server/send/frequest":
                    console.log("friend request sent");
                    //socket.emit('action', { type: 'user/client/acce', data: 'good day!' });
                    await requestFriendship(userName, senderToken);

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