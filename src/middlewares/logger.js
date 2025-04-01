const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url, ip } = req;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] Response: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = loggerMiddleware;
