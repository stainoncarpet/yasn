import io from 'socket.io-client';

const postsSocket = io('/posts');

const establishPostsSocketConnection = () => {
    console.log("establishing socket connection");

    postsSocket.on("connect", () => {
        console.log("client socket connected thru /posts");
    });
};

export default postsSocket;
export {establishPostsSocketConnection};