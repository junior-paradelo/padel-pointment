// Error handling middleware for Express.js
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong!";

    console.error(`[ERROR] ${new Date().toISOString()} ${statusCode}: ${message}`);

    if (err.stack) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });

    next();
};

module.exports = errorHandler;
