// Middleware to authenticate JWT tokens
const jwt = require("jsonwebtoken");
const UserDTO = require("../utils/dto/UserDTO");

function authenticateToken(req, res, next) {
    const accessToken = req.cookies[process.env.ACCESS_TOKEN_NAME];
    req.session = { user: null };

    if (!accessToken) return res.status(401).json({ error: "No token provided" });

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.session.user = new UserDTO(user);
        next();
    });
}

module.exports = authenticateToken;
