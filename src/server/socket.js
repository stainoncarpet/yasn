const socketio = require('socket.io');

const setupSocket = (httpServer) => {
    const io = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });

    io.on('connection', (socket) => {
        console.log("client socket connected to socket server ", socket.id);

        socket.emit('action', {type:'user/client/message', data:'good day!'}); // works

        socket.on('action', (action) => {
          console.log("ON ACTION FROM CLIENT: ", action);
          
            if(action.type === 'user/server/hello'){
              console.log('Got hello data!', action.data);
              socket.emit('action', {type:'user/client/message', data:'good day!'});
            }
          });

        socket.on('disconnect', function (socket) {
            console.log("client socket disconnected");
        });
    });

    return io;
}

module.exports = setupSocket;