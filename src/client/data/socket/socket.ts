import io from 'socket.io-client';

const socket = io('/');

const establishSocketConnection = () => {
    console.log("establishing socket connection");
    socket.on("connect", () => {
        console.log("client socket connected");
    })
};

export default socket;
export {establishSocketConnection}