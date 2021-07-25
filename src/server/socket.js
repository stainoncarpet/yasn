const socketio = require('socket.io');


const setupSocket = (httpServer) => {
    const io = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });

    io.on('connection', (socket) => {
        console.log("client socket connected to socket server ", socket.id);

        socket.emit('action', {type:'user/server/message', data:'good day!'});

        socket.on('action', (action) => {
            if(action.type === 'server/hello'){
              console.log('Got hello data!', action.data);
              socket.emit('action', {type:'user/message', data:'good day!'});
            }
          });

        socket.on('disconnect', function (socket) {
            console.log("client socket disconnected");
        });
    });

    return io;
}

module.exports = setupSocket;