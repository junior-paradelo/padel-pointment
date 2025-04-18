// This middleware checks if the request has a valid JWT token in the Authorization header.
const jwt = require("jsonwebtoken");
const UserDTO = require("../utils/dto/UserDTO");

function authenticateToken(req, res, next) {
    const token = req.cookies.access_token || req.headers["authorization"]?.split(" ")[1];
    req.session = { user: null };

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.session.user = new UserDTO(user);
        next();
    });
}

module.exports = authenticateToken;
