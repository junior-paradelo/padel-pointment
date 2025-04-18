const { registerUser, loginUser, logoutUser } = require("../services/auth");
const { validateUserLogin, validateUserRegister } = require("../schemas/users");

/**
 * Registers a new user in the system.
 * @async
 * @function register
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @param {string} req.body.name - User's name
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Returns a promise that resolves when the registration is complete
 */
const register = async (req, res) => {
    const { email, password, name } = req.body;
    const data = validateUserRegister({ email, password, name });
    try {
        const user = await registerUser(data.email, data.password, data.name);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * Authenticates a user and generates a JWT token.
 * @async
 * @function login
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - User's email address
 * @param {string} req.body.password - User's password
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Returns a promise that resolves when the login is complete
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    const data = validateUserLogin({ email, password });
    try {
        const token = await loginUser(data.email, data.password);
        res.status(200)
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true in production
                sameSite: "strict", // CSRF protection
                maxAge: 60 * 60 * 1000, // 1 hour
            })
            .json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

/**
 * Logs out the user by clearing the JWT token.
 * @async
 * @function logout
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Returns a promise that resolves when the logout is complete
 */
const logout = (req, res) => {
    try {
        logoutUser(req, res);
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login, logout };
