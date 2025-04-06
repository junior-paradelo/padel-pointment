const { registerUser, loginUser } = require("../services/auth");

const register = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await registerUser(email, password, name);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
