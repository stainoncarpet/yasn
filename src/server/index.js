const startApolloServer = require("./apollo.js");
const startExpressServer = require("./express.js");
const connectToDb = require("./data/mongo/connectToDb.js");

const express = startExpressServer();
const apollo = startApolloServer(express);

connectToDb();