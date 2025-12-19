const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

// Middleware to verify session and attach user to req.auth
// If strict is true (default), it will error if no token is found.
// Actually ClerkExpressWithAuth just attaches auth, we need to check it.

const requireAuth = (req, res, next) => {
    // Use Clerk's middleware logic if we can wrap it, or just use it directly in routes.
    // But to keep it clean, let's wrap or re-export.

    // Standard Clerk middleware usage:
    // app.use(ClerkExpressWithAuth())
    // Then in route: if (!req.auth.userId) ...

    // However, for best DX, let's make a wrapper that blocks the request.
    if (!req.auth || !req.auth.userId) {
        return res.status(401).json({ error: 'Unauthorized: No valid session detected' });
    }
    next();
};

module.exports = {
    // We export the Clerk middleware itself to be used globally or per route
    // AND our strict checker.
    ClerkExpressWithAuth,
    requireAuth
};
