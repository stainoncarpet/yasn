const express = require("express");
const path = require("path");
const morgan = require('morgan');
//const helmet = require("helmet");

const setupExpress = () => {
    const publicFolder = path.resolve(process.cwd(), "public");
    const buildFolder = path.resolve(process.cwd(), "build");
    const uploadsFolder = path.resolve(process.cwd(), "uploads");
    const indexFile = path.resolve(process.cwd(), "src", "public", "index.html");

    const app = express();

    app.use(require("cors")());
    app.use(require("compression")());

    app.use(express.static(publicFolder));
    app.use(express.static(buildFolder));
    app.use(express.static(uploadsFolder));

    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ extended: true }));

    process.env.NODE_ENV === "development" && app.use(morgan("tiny"));

    app.use(require("./routes/auth.js"));
    app.use(require("./routes/profile.js"));
    app.use(require("./routes/user.js"));

    app.get("*", (req, res) => {
        res.status(200).sendFile(indexFile);
    });

    return app;
};

module.exports = setupExpress;