const { createServer } = require('http');

const startApolloServer = require("./apollo.js");
const setupExpress = require("./express.js");
const connectToDb = require("./data/mongo/connectToDb.js");
const setupSocket = require("./socket.js")

const express = setupExpress();
const apollo = startApolloServer(express);
const httpServer = createServer(express);
const socket = setupSocket(httpServer);

httpServer.listen(3000, () => console.log(`>>>>> SERVER IS LIVE ON ${3000}`));

connectToDb();