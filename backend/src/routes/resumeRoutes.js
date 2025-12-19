const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const { requireAuth, ClerkExpressWithAuth } = require('../middleware/authMiddleware');
const { validate, CreateResumeSchema, UpdateResumeSchema } = require('../middleware/validationMiddleware');

// Apply Clerk middleware to all routes in this router
router.use(ClerkExpressWithAuth());

router.post('/user-resumes', requireAuth, validate(CreateResumeSchema), resumeController.createResume);
router.get('/user-resumes', requireAuth, resumeController.getAllResumes);
router.get('/user-resumes/:id', resumeController.getResumeById); // Public route for sharing
router.put('/user-resumes/:id', requireAuth, validate(UpdateResumeSchema), resumeController.updateResume);
router.delete('/user-resumes/:id', requireAuth, resumeController.deleteResume);
router.post('/user-resumes/:id/clone', requireAuth, resumeController.cloneResume);

module.exports = router;

