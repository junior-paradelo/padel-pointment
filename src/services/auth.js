const UserDTO = require("../utils/dto/UserDTO");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const registerUser = async (email, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });
        return new UserDTO(user);
    } catch (error) {
        if (error.code === "P2002") {
            throw new Error("Email already exists");
        }
        throw new Error("Error creating user");
    }
};

const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    if (!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const accessToken = jwt.sign({ uid: user.uid }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5m",
    });
    const refreshToken = jwt.sign({ uid: user.uid }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
    });
    await prisma.userRefreshToken.create({
        data: {
            userId: user.uid,
            token: refreshToken,
        },
    });
    return { accessToken, refreshToken };
};

const logoutUser = (req, res) => {
    res.clearCookie(process.env.ACCESS_TOKEN_NAME);
    res.clearCookie(process.env.REFRESH_TOKEN_NAME);
};

const refreshToken = async (req, res) => {
    if (req.cookies[process.env.REFRESH_TOKEN_NAME]) {
        const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];
        const userConnection = await prisma.userRefreshToken.findUnique({
            where: { token: refreshToken },
        });
        if (!userConnection) {
            return res.status(403).json({ error: "Forbidden" });
        }
        let newAccessToken;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ error: "Forbidden" });
            }
            newAccessToken = jwt.sign({ uid: userConnection.userId }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "5m",
            });
        });
        return { accessToken: newAccessToken };
    } else {
        throw new Error("No refresh token provided");
    }
};

module.exports = { registerUser, loginUser, logoutUser, refreshToken };
