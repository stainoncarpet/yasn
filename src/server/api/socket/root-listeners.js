const { updateLastOnline } = require("../../data/services/auth-crud.js");

const rootNamespaceListeners = (rootNamespace) => {
    rootNamespace.on('connection', (socket) => {
        console.log("client socket connected to root socket server ", socket.id);

        // NEED MORE SOPHISTICATED LOGIC HERE IN DISCONNECT
        socket.on('update-last-online', async (obj) => await updateLastOnline(obj.token));

        socket.on('disconnect', (socket) => {
            console.log("client socket disconnected from /");
        });
    });
};

module.exports = rootNamespaceListeners;