const { registerUser, loginUser, logoutUser, refreshToken } = require("../services/auth");
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
    const data = validateUserRegister(req.body);
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
    const data = validateUserLogin(req.body);
    try {
        const { accessToken, refreshToken } = await loginUser(data.email, data.password);
        res.status(200)
            .cookie(process.env.ACCESS_TOKEN_NAME, accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true in production
                sameSite: "strict", // CSRF protection
                maxAge: 60 * 5 * 1000, // 5 minutes
            })
            .cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true in production
                sameSite: "strict", // CSRF protection
                maxAge: 60 * 60 * 24 * 1000, // 1 day
            })
            .json({ message: "Login successful", accessToken });
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

/**
 * Refreshes the JWT token.
 * @async
 * @function refresh
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} - Returns a promise that resolves when the token refresh is complete
 */
const refresh = async (req, res) => {
    try {
        const { accessToken } = await refreshToken(req, res);
        res.status(200)
            .cookie(process.env.ACCESS_TOKEN_NAME, accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // Set to true in production
                sameSite: "strict", // CSRF protection
                maxAge: 60 * 5 * 1000, // 5 minutes
            })
            .json({ message: "Token refreshed successfully", accessToken });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
};

module.exports = { register, login, logout, refresh };
