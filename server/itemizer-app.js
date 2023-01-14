const express = require("express");
const cors = require("cors");
// Require db/mongoose so tests can have access
require("./db/mongoose");
const userRouter = require("./routers/user");
const itemRouter = require("./routers/item");

const itemizerApp = express();

itemizerApp.use(express.json());
// itemizerApp.use(express.static('docs'));
let corsOptions = {
    origin: [
        "http://localhost:4200",
        "https://zmertens.github.io/itemizer-app",
        "https://zmertens.github.io/itemizer-app/docs",
        "https://zmertens.github.io/itemizer-app/docs/users",
        "https://zmertens-itemizer-app.herokuapp.com/users/login",
        "https://zmertens-itemizer-app.herokuapp.com/"
    ],
    preflightContinue: true,
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Origin",
        "X-Requested-With",
        "Accept",
        "x-client-key",
        "x-client-token",
        "x-client-secret",
        "Authorization",
    ],
    credentials: true,
};
itemizerApp.use(cors(corsOptions));
itemizerApp.options("*", cors());
itemizerApp.use(userRouter);
itemizerApp.use(itemRouter);

/**
 * This is necessary but not sure why
 * https://itnext.io/express-server-for-an-angular-application-part-1-getting-started-2cd27de691bd
 */
itemizerApp.all("*", function (req, res) {
    res.status(200).sendFile(`/`, { root: "docs" });
});
module.exports = itemizerApp;
