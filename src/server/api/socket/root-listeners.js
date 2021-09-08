const { updateLastOnline } = require("../../data/services/auth-crud.js");
const { bulkNotifyFriends } = require("../../data/services/user-crud.js");

//eact space has its own socket/user registry
const rootNamespaceListeners = (rootNamespace, profileNamespace, userNamespace, dictionary) => {
    rootNamespace.on('connection', (socket) => {
        // on LOGIN, SIGNUP, WINDOWCLOSE
        socket.on("check-in-global-room", async ({ token }) => {
            try {
                let userId = null;

                if (token) {
                    const updateResult = await updateLastOnline(token, null);
                    userId = updateResult[0];
                } else {
                    return;
                }

                dictionary[socket.id] = userId.toString();
                bulkNotifyFriends(rootNamespace, dictionary, userId, [{ type: 'profile/client/friend/online', payload: { userId: userId } }]);
            } catch (error) {
                console.log(error);
            }
        });

        // on LOGOUT
        socket.on("check-out-global-room", async ({ token }) => {
            try {
                if (token || dictionary[socket.id]) {
                    const [userId, lastOnline] = await updateLastOnline(null, dictionary[socket.id]);

                    bulkNotifyFriends(rootNamespace, dictionary, dictionary[socket.id], [{ type: 'profile/client/friend/offline', payload: { userId: userId, lastOnline } }]);
                    delete dictionary[socket.id];
                }
            } catch (error) {
                console.log(error);
            }
        });

        // on WINDOWCLOSE
        socket.on('disconnect', async () => {
            try {
                if (dictionary[socket.id]) {
                    const [userId, lastOnline] = await updateLastOnline(null, dictionary[socket.id]);

                    bulkNotifyFriends(rootNamespace, dictionary, dictionary[socket.id], [{ type: 'profile/client/friend/offline', payload: { userId: userId, lastOnline } }]);
                    delete dictionary[socket.id];
                }
            } catch (error) {
                console.log(error);
            }
        });
    });
};

module.exports = rootNamespaceListeners;