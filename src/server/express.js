const express = require("express");
const path = require("path");
//const helmet = require("helmet");

const setupExpress = () => {
    const publicFolder = path.resolve(process.cwd(), "src", "server", "public");
    const uploadsFolder = path.resolve(process.cwd(), "uploads");
    const indexFile = path.resolve(process.cwd(), "src", "server", "public", "index.html");

    const app = express();

    app.use(require("cors")());
    app.use(require("compression")());

    app.use(express.static(publicFolder));
    app.use(express.static(uploadsFolder));
    
    app.use(express.json({limit: "5mb"}));
    app.use(express.urlencoded({ extended: true }));

    app.use(require("./routes.js"));

    app.get("*", (req, res, next) => {
        if (req.url === '/graphql' || req.url === '/graphql/subscriptions') return next();
        res.status(200).sendFile(indexFile);
    });

    return app;
};

module.exports = setupExpress;