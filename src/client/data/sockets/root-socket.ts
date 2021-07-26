import io from 'socket.io-client';

const rootSoket = io();

const establishSocketConnection = () => {
    console.log("establishing socket connection");

    rootSoket.on("connect", () => {
        console.log("client socket connected thru /");
    });
};

export default rootSoket;
export {establishSocketConnection};