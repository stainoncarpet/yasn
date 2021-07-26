const rootNamespaceListeners = (rootNamespace) => {
    rootNamespace.on('connection', (socket) => {
        console.log("client socket connected to root socket server ", socket.id);

        socket.on('action', (action) => {
            switch (action.type) {
                case "user/server/hello":
                    socket.emit('action', { type: 'user/client/message', data: 'good day!' });
                    break;

                default: console.log("default switch in root namespace: ", action)
            }
        });

        socket.on('disconnect', function (socket) {
            console.log("client socket disconnected from /");
        });
    });
};

module.exports = rootNamespaceListeners;