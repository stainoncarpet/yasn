const { createServer } = require('http');

const startApolloServer = require("./apollo.js");
const setupExpress = require("./api/express/express.js");
const connectToDb = require("./data/mongo/connectToDb.js");
const io = require("./api/socket/socket.js")

const express = setupExpress();
const apollo = startApolloServer(express);
const httpServer = createServer(express);
const socket = io.setupNamespaces(httpServer);

httpServer.listen(3000, () => console.log(`>>>>> SERVER IS LIVE ON ${3000}`));

connectToDb();