require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();

const loggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(errorHandler);
app.use("/api", routes);

module.exports = app;
