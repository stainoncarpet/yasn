const express = require("express");
const compression = require("compression");
const cors = require("cors");
//const helmet = require("helmet");
const path = require("path");
const { ApolloServer } = require('apollo-server-express');

const { resolvers } = require("./data/apollo/resolvers.js");
const { typeDefs } = require("./data/apollo/typeDefs.js");
const { connectToDb } = require("./data/mongo/connectToDb.js");

const publicFolder = path.resolve(process.cwd(), "src", "server", "public");
const uploadsFolder = path.resolve(process.cwd(), "uploads");
const indexFile = path.resolve(process.cwd(), "src", "server", "public", "index.html");
const app = express();

app.use(cors());
app.use(compression());
app.use(express.static(publicFolder));
app.use(express.static(uploadsFolder));
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

const server = new ApolloServer({ typeDefs, resolvers });
server.start();

server.applyMiddleware({ app });

app.listen(port, () => {
    console.log(`>>>>> EXPRESS SERVER IS LIVE ON ${port}`);
    console.log(`>>>>> GRAPHQL SERVER IS LIVE ON ${port}${server.graphqlPath}`);
});

app.get("/test", async (req, res) => {
    res.status(200).send({ msg: "You and the server shake hands" });
});

app.get("/*", (req, res) => {
    res.status(200).sendFile(indexFile);
});

connectToDb();