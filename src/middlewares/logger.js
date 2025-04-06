// This middleware logs the request method, URL, IP address, and response status code along with the duration of the request.
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url, ip } = req;

    const prettyDate = new Date(timestamp).toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    console.log(`[${prettyDate}] ${method} ${url} - IP: ${ip}`);
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(`[${prettyDate}] Response: ${res.statusCode} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = loggerMiddleware;
