const { createServer } = require('http');

const setupExpress = require("./api/express/express.js");
const connectToDb = require("./data/mongo/connectToDb.js");
const io = require("./api/socket/socket.js");
const {getUserDictionary} = require("./data/services/utils.js");

const userDictionary = getUserDictionary();

const express = setupExpress();
const httpServer = createServer(express);
const socket = io.setupNamespaces(httpServer, userDictionary);

httpServer.listen(3000, () => console.log(`>>>>> SERVER IS LIVE ON ${3000}`));

connectToDb();