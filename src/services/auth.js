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
    const token = jwt.sign({ uid: user.uid, name: user.name, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
    });
    return token;
};

const logoutUser = (req, res) => {
    res.clearCookie("access_token");
};

module.exports = { registerUser, loginUser, logoutUser };
