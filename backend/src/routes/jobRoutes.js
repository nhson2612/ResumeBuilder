const express = require('express');
const router = express.Router();
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const { requireAuth } = require('../middleware/authMiddleware');
const {
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication
} = require('../controllers/jobController');

// All routes require authentication
router.use(ClerkExpressWithAuth());
router.use(requireAuth);

// CRUD routes
router.get('/', getApplications);
router.post('/', createApplication);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);

module.exports = router;
