require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

const loggerMiddleware = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const authenticateToken = require("./middlewares/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggerMiddleware);
app.use(errorHandler);
app.use("/api", routes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/db-users", authenticateToken, async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
});

module.exports = app;
