const socketio = require('socket.io');

const profileNamespaceListeners = require("./listeners/profile.js");
const userNamespaceListeners = require("./listeners/user.js");
const rootNamespaceListeners = require("./listeners/root.js");

const io = {
  userDictionary: null,

  rootNamespace: null, // '/'
  profileNamespace: null, // '/profile'
  userNamespace: null, // '/user'

  getRootNamespace: () => this.rootNamespace,
  getProfileNamespace: () => this.profileNamespace,
  getUserNamespace: () => this.userNamespace,
  getUserDictionary: () => this.userDictionary,

  setupNamespaces: (httpServer) => {
    this.rootNamespace = socketio(httpServer, { pingInterval: 10000, pingTimeout: 5000 });
    this.profileNamespace = this.rootNamespace.of("/profile");
    this.userNamespace = this.rootNamespace.of("/user");

    this.userDictionary = {};
    
    rootNamespaceListeners(this.rootNamespace, this.profileNamespace, this.userNamespace, this.userDictionary);
    profileNamespaceListeners(this.rootNamespace, this.profileNamespace, this.userNamespace, this.userDictionary);
    userNamespaceListeners(this.rootNamespace, this.profileNamespace, this.userNamespace, this.userDictionary);

    return this;
  }
};

module.exports = io;