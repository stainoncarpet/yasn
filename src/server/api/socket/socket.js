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
  getUserNamespace: () => this.userNamespace,

  setupNamespaces: (httpServer) => {
    const userDictionary = {};

    this.rootNamespace = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });
    this.profileNamespace = this.rootNamespace.of("/profile");
    this.userNamespace = this.rootNamespace.of("/user");
    
    rootNamespaceListeners(this.rootNamespace, this.profileNamespace, this.userNamespace, userDictionary);
    profileNamespaceListeners(this.rootNamespace, this.profileNamespace, this.userNamespace, userDictionary);
    userNamespaceListeners(this.rootNamespace, this.profileNamespace, this.userNamespace, userDictionary);

    return this;
  }
};

module.exports = io;