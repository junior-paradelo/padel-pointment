require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

const loggerMiddleware = require("./middlewares/logger");

app.use(express.json());
app.use(loggerMiddleware);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/db-users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users." });
    }
});

module.exports = app;
