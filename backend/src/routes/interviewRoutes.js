const express = require('express');
const router = express.Router();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const { requireAuth } = require('../middleware/authMiddleware');
const {
    getSessions,
    createSession,
    getSessionDetails,
    saveQuestion,
    completeSession,
    getWeakQuestions,
    deleteSession
} = require('../controllers/interviewController');

// All routes require authentication
router.use(ClerkExpressWithAuth());
router.use(requireAuth);

// Sessions
router.get('/sessions', getSessions);
router.post('/sessions', createSession);
router.get('/sessions/:id', getSessionDetails);
router.post('/sessions/:id/questions', saveQuestion);
router.put('/sessions/:id/complete', completeSession);
router.delete('/sessions/:id', deleteSession);

// Weak questions for review
router.get('/weak-questions', getWeakQuestions);

module.exports = router;
