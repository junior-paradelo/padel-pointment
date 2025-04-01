require("dotenv").config();
const express = require("express");
const app = express();

const loggerMiddleware = require("./middlewares/logger");

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

module.exports = app;
