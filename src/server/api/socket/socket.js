const socketio = require('socket.io');

const postsNamespaceListeners = require("./posts-listeners.js");
const usersNamespaceListeners = require("./users-listeners.js");
const rootNamespaceListeners = require("./root-listeners.js");

const io = {
  rootNamespace: null, // '/'
  postsNamespace: null, // '/posts'
  usersNamespace: null, // '/users'
  getRootNamespace: () => this.rootNamespace,
  getPostsNamespace: () => this.postsNamespace,
  setupNamespaces: (httpServer) => {
    this.rootNamespace = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });
    this.postsNamespace = this.rootNamespace.of("/posts");
    this.usersNamespace = this.rootNamespace.of("/users");
    
    rootNamespaceListeners(this.rootNamespace);
    postsNamespaceListeners(this.postsNamespace);
    usersNamespaceListeners(this.usersNamespace);

    return this;
  }
};

module.exports = io;