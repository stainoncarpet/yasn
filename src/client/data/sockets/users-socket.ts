import io from 'socket.io-client';

const usersSocket = io("/users");

const establishSocketConnection = () => {
    console.log("establishing socket connection");

    usersSocket.on("connect", () => {
        console.log("client socket connected thru /");
    });
};

export default usersSocket;
export {establishSocketConnection};