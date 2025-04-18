const express = require("express");
const responseTime = require("response-time");
const compression = require("compression");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const loggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(responseTime());
app.use(compression());
app.use(loggerMiddleware);
app.use(errorHandler);
app.use("/api", routes);

module.exports = app;
