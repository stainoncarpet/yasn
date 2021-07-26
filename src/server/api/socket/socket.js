const socketio = require('socket.io');

const postsNamespaceListeners = require("./posts-listeners.js");
const rootNamespaceListeners = require("./root-listeners.js")

const io = {
  rootNamespace: null, // '/'
  postsNamespace: null, // '/posts'
  getRootNamespace: () => this.rootNamespace,
  getPostsNamespace: () => this.postsNamespace,
  setupNamespaces: (httpServer) => {
    this.rootNamespace = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });
    this.postsNamespace = this.rootNamespace.of("/posts");
    
    rootNamespaceListeners(this.rootNamespace);
    postsNamespaceListeners(this.postsNamespace);

    return this;
  }
};

module.exports = io;