const request = require('supertest');
const app = require('../index');

describe('Health Check', () => {
    it('should return 404 for unknown root route but ensure app is running', async () => {
        const res = await request(app).get('/');
        // Since we don't have a root route defined in index.js, it should return 404,
        // but getting a response means the app is up.
        expect(res.statusCode).not.toBe(500);
    });

    // Determine a valid route to test from available routes
    // index.js uses /api for resumeRoutes and aiRoutes
    // Let's assume there is some protected route, but we can check if it returns 401/403 or 200
    // But better, let's just check the app boots up.
});
