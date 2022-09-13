const mongoose = require("mongoose");
const debug = require("debug")("server:db");
const chalk = require("chalk");
const { connectionString } = require("../config");

const initFromMock = require("./initFromMock");
const initFromXml = require("./initFromXml");

module.exports = function () {
    mongoose.connect(connectionString);

    const db = mongoose.connection;

    db.on(
        "error",
        console.error.bind(console, `${chalk.red("x")} connection error:`)
    );

    if (process.env.NODE_ENV !== "production") {
        db.once("open", async function () {
            debug(`MongoDB status: Connected ${chalk.green("✓")}`);
            await initFromMock();
            await initFromXml();
            debug(`Data loaded ${chalk.green("✓")}`);
        });
    }
};
