const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// Get all applications for a user
const getApplications = async (req, res) => {
    try {
        const userId = req.auth.userId;

        const applications = await prisma.jobApplication.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        });

        res.json({ data: applications });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
};

// Create new application
const createApplication = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { company, position, jobUrl, location, salary, status, appliedDate, notes } = req.body;

        if (!company || !position) {
            return res.status(400).json({ error: 'Company and position are required' });
        }

        const application = await prisma.jobApplication.create({
            data: {
                applicationId: uuidv4(),
                userId,
                company,
                position,
                jobUrl: jobUrl || null,
                location: location || null,
                salary: salary || null,
                status: status || 'wishlist',
                appliedDate: appliedDate || null,
                notes: notes || null
            }
        });

        res.status(201).json({ data: application });
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Failed to create application' });
    }
};

// Update application (including status change for Kanban)
const updateApplication = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id } = req.params;
        const updateData = req.body;

        // Verify ownership
        const existing = await prisma.jobApplication.findFirst({
            where: { applicationId: id, userId }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Application not found' });
        }

        // Handle contacts JSON
        if (updateData.contacts && typeof updateData.contacts === 'object') {
            updateData.contacts = JSON.stringify(updateData.contacts);
        }

        const application = await prisma.jobApplication.update({
            where: { applicationId: id },
            data: updateData
        });

        res.json({ data: application });
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).json({ error: 'Failed to update application' });
    }
};

// Delete application
const deleteApplication = async (req, res) => {
    try {
        const userId = req.auth.userId;
        const { id } = req.params;

        // Verify ownership
        const existing = await prisma.jobApplication.findFirst({
            where: { applicationId: id, userId }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Application not found' });
        }

        await prisma.jobApplication.delete({
            where: { applicationId: id }
        });

        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
};

module.exports = {
    getApplications,
    createApplication,
    updateApplication,
    deleteApplication
};
