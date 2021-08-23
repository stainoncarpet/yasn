const { updateLastOnline } = require("../../data/services/auth-crud.js");

//eact space has its own socket/user registry
const rootNamespaceListeners = (rootNamespace, profileNamespace, userNamespace, dictionary) => {   
    rootNamespace.on('connection', (socket) => {
        console.log("client socket connected to root socket server ", socket.id);

        socket.on("check-in-global-room", async ({ userId }) => {
            console.log("user ", userId, " checked in to global room");

            dictionary[socket.id] = userId;
        });

        // NEED MORE SOPHISTICATED LOGIC HERE IN DISCONNECT
        socket.on('update-last-online', async (obj) => obj.token && await updateLastOnline(obj.token));

        socket.on('disconnect', () => {
            console.log("client socket disconnected from /", socket.id);

            delete dictionary[socket.id];
            
            console.log(dictionary);
            console.log(socket.adapter.rooms);
        });
    });
};

module.exports = rootNamespaceListeners;