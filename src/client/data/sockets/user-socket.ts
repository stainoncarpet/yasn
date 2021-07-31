import io from 'socket.io-client';

const userSocket = io("/users");

const establishSocketConnection = () => {
    console.log("establishing socket connection");

    userSocket.on("connect", () => {
        console.log("client socket connected thru /");
    });
};

export default userSocket;
export {establishSocketConnection};