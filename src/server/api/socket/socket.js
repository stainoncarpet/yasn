const socketio = require('socket.io');

const profileNamespaceListeners = require("./profile-listeners.js");
const userNamespaceListeners = require("./user-listeners.js");
const rootNamespaceListeners = require("./root-listeners.js");

const io = {
  rootNamespace: null, // '/'
  profileNamespace: null, // '/profile'
  userNamespace: null, // '/user'
  getRootNamespace: () => this.rootNamespace,
  getProfileNamespace: () => this.profileNamespace,
  setupNamespaces: (httpServer) => {
    this.rootNamespace = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });
    this.profileNamespace = this.rootNamespace.of("/profile");
    this.userNamespace = this.rootNamespace.of("/user");
    
    rootNamespaceListeners(this.rootNamespace);
    profileNamespaceListeners(this.profileNamespace);
    userNamespaceListeners(this.userNamespace);

    return this;
  }
};

module.exports = io;