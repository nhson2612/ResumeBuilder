const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// Get all interview sessions for a user
const getSessions = async (req, res) => {
    try {
        const userId = req.auth.userId;

        const sessions = await prisma.interviewSession.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: {
                questions: {
                    select: {
                        evaluation: true
                    }
                }
            }
        });

        // Calculate stats for each session
        const sessionsWithStats = sessions.map(session => {
            const totalQuestions = session.questions.length;
            const weakQuestions = session.questions.filter(q => q.evaluation === 'weak' || q.evaluation === 'needs_improvement').length;
            const goodQuestions = session.questions.filter(q => q.evaluation === 'good').length;

            return {
                ...session,
                stats: {
                    total: totalQuestions,
                    good: goodQuestions,
                    weak: weakQuestions
                },
                questions: undefined // Don't send full questions in list
            };
        });

        res.json({ data: sessionsWithStats });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
};

// Create new interview session
const createSession = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { resumeId, questionCount, difficulty, voiceEnabled } = req.body;

        const session = await prisma.interviewSession.create({
            data: {
                sessionId: uuidv4(),
                userId,
                resumeId: resumeId || null,
                questionCount: questionCount || 5,
                difficulty: difficulty || 'medium',
                voiceEnabled: voiceEnabled || false
            }
        });

        res.status(201).json({ data: session });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ error: 'Failed to create session' });
    }
};

// Get session details with all questions
const getSessionDetails = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id } = req.params;

        const session = await prisma.interviewSession.findFirst({
            where: { sessionId: id, userId },
            include: {
                questions: {
                    orderBy: { questionNumber: 'asc' }
                }
            }
        });

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.json({ data: session });
    } catch (error) {
        console.error('Error fetching session details:', error);
        res.status(500).json({ error: 'Failed to fetch session details' });
    }
};

// Save a question/answer to session
const saveQuestion = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id } = req.params;
        const { questionNumber, question, userAnswer, evaluation, aiFeedback, suggestedAnswer } = req.body;

        // Verify session ownership
        const session = await prisma.interviewSession.findFirst({
            where: { sessionId: id, userId }
        });

        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const interviewQuestion = await prisma.interviewQuestion.create({
            data: {
                questionId: uuidv4(),
                sessionId: id,
                questionNumber,
                question,
                userAnswer: userAnswer || null,
                evaluation: evaluation || null,
                aiFeedback: aiFeedback || null,
                suggestedAnswer: suggestedAnswer || null
            }
        });

        res.status(201).json({ data: interviewQuestion });
    } catch (error) {
        console.error('Error saving question:', error);
        res.status(500).json({ error: 'Failed to save question' });
    }
};

// Complete a session
const completeSession = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id } = req.params;
        const { totalScore } = req.body;

        // Verify ownership
        const existing = await prisma.interviewSession.findFirst({
            where: { sessionId: id, userId }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Session not found' });
        }

        const session = await prisma.interviewSession.update({
            where: { sessionId: id },
            data: {
                status: 'completed',
                totalScore: totalScore || null,
                completedAt: new Date()
            }
        });

        res.json({ data: session });
    } catch (error) {
        console.error('Error completing session:', error);
        res.status(500).json({ error: 'Failed to complete session' });
    }
};

// Get all weak questions for a user (for review)
const getWeakQuestions = async (req, res) => {
    try {
        const userId = req.auth.userId;

        const weakQuestions = await prisma.interviewQuestion.findMany({
            where: {
                session: { userId },
                evaluation: { in: ['weak', 'needs_improvement'] }
            },
            include: {
                session: {
                    select: {
                        difficulty: true,
                        createdAt: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({ data: weakQuestions });
    } catch (error) {
        console.error('Error fetching weak questions:', error);
        res.status(500).json({ error: 'Failed to fetch weak questions' });
    }
};

// Delete a session
const deleteSession = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id } = req.params;

        // Verify ownership
        const existing = await prisma.interviewSession.findFirst({
            where: { sessionId: id, userId }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Session not found' });
        }

        // Delete questions first (cascade)
        await prisma.interviewQuestion.deleteMany({
            where: { sessionId: id }
        });

        await prisma.interviewSession.delete({
            where: { sessionId: id }
        });

        res.json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ error: 'Failed to delete session' });
    }
};

module.exports = {
    getSessions,
    createSession,
    getSessionDetails,
    saveQuestion,
    completeSession,
    getWeakQuestions,
    deleteSession
};
