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
        "https://zmertens.github.io/itemizer-app/docs",
    ],
    credentials: false,
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
