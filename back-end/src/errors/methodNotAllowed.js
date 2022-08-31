function methodNotAllowed(req, res, next) {
    next({
        status: 500,
        message: `${req.method} not allowed: ${req.originalUrl}`,
    });
};

module.exports = methodNotAllowed;