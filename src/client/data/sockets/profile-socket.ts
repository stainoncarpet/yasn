import io from 'socket.io-client';

const profileSocket = io('/profile');

const establishProfileSocketConnection = () => {
    console.log("establishing socket connection");

    profileSocket.on("connect", () => {
        console.log("client socket connected thru /posts");
    });
};

export default profileSocket;
export {establishProfileSocketConnection};