const express = require("express");
const path = require("path");
//const helmet = require("helmet");

const setupExpress = () => {
    const buildFolder = path.resolve(process.cwd(), "build");
    const uploadsFolder = path.resolve(process.cwd(), "uploads");
    const indexFile = path.resolve(process.cwd(), "build", "index.html");

    const app = express();

    app.use(require("cors")());
    app.use(require("compression")());
    app.use(require("cookie-parser")());

    app.use(express.static(buildFolder));
    app.use(express.static(uploadsFolder));

    app.use(express.json({ limit: "5mb" }));
    app.use(express.urlencoded({ extended: true }));

    process.env.NODE_ENV === "development" && app.use(require('morgan')("tiny") );

    app.use(require("./routes/auth.js"));
    app.use(require("./routes/profile.js"));
    app.use(require("./routes/user.js"));

    app.get("*", (req, res) => {
        res.status(200).sendFile(indexFile);
    });

    return app;
};

module.exports = setupExpress;