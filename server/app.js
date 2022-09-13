const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const errorMiddleware = require("./middleware/error.middleware");

require("./startup/db")();

const app = express();

if (process.env.NODE_ENV === "production") {
    const clientPath = path.join(__dirname, "client");
    app.use("/", express.static(clientPath));
    const indexPath = path.join(clientPath, "index.html");
    app.get("*", (req, res) => {
        res.sendFile(indexPath);
    });
    app.use(cors());
} else {
    const corsOptions = {
        origin: "http://localhost:3000"
    };
    app.use(cors(corsOptions));
}

app.use(logger("common"));

const maxRequestBodySize = "1mb";
app.use(express.json({ limit: maxRequestBodySize }));
app.use(express.urlencoded({ extended: false, limit: maxRequestBodySize }));

app.use(cookieParser());

app.use("/index", (req, res, next) => {
    res.status(200).send({ message: "Server is up", status: 200 });
}); // test route
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

app.use(errorMiddleware);

module.exports = app;
