const express = require("express");
const compression = require("compression");
const cors = require("cors");
const path = require("path");
//const helmet = require("helmet");
const router = require("./routes.js");

const startExpressServer = () => {
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

    app.use(router);

    app.get("/test", async (req, res) => {
        res.status(200).send({ msg: "You and the server shake hands" });
    });

    app.get("*", (req, res, next) => {
        if (req.url === '/graphql' || req.url === '/graphql/subscriptions') return next();
        res.status(200).sendFile(indexFile);
    });

    return app;
};

module.exports = startExpressServer;