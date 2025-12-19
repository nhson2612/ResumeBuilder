const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { requireAuth, ClerkExpressWithAuth } = require('../middleware/authMiddleware');

router.post('/ai-chat', ClerkExpressWithAuth(), requireAuth, aiController.generateContent);

module.exports = router;
