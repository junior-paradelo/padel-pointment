// This middleware checks if the request has a valid JWT token in the Authorization header.
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
