const userNamespaceListeners = (usersNamespace) => {
    usersNamespace.on('connection', (socket) => {
        console.log("client socket connected to /users socket server ", socket.id);

        socket.on('action', (action) => {
            switch (action.type) {
                case "user/server/hello":
                    socket.emit('action', { type: 'user/client/message', data: 'good day!' });

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