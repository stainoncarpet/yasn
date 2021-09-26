const { createServer } = require('http');

const setupExpress = require("./api/express/express.js");
const connectToDb = require("./data/mongo/connectToDb.js");
const io = require("./api/socket/socket.js");

const express = setupExpress();
const httpServer = createServer(express);
const socket = io.setupNamespaces(httpServer);

const port = process.env.PORT || 3001;

httpServer.listen(port, () => console.log(`>>>>> SERVER IS LIVE ON ${port}`));

connectToDb();