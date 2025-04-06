const { registerUser, loginUser } = require("../services/auth");

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
    try {
        const user = await registerUser(email, password, name);
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
    try {
        const token = await loginUser(email, password);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
