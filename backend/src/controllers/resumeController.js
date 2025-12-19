const prisma = require('../utils/prismaClient');

const createResume = async (req, res) => {
    try {
        const { data } = req.body;
        const payload = data || req.body;
        const { userId } = req.auth; // Secure User ID from Clerk

        const newResume = await prisma.userResume.create({
            data: {
                title: payload.title,
                resumeId: payload.resumeId,
                userEmail: payload.userEmail, // We still save email for reference
                userName: payload.userName,
                userId: userId // Secure ownership
            }
        });

        res.status(201).json({
            data: {
                documentId: newResume.resumeId,
                ...newResume
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create resume' });
    }
};

const getAllResumes = async (req, res) => {
    try {
        const { userId } = req.auth; // Get ID from token

        // Find resumes owned by this user
        const resumes = await prisma.userResume.findMany({
            where: {
                userId: userId
            }
        });

        res.json({
            data: resumes.map(r => ({
                id: r.id,
                documentId: r.resumeId,
                ...r
            }))
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
};

const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;

        const resume = await prisma.userResume.findUnique({
            where: { resumeId: id }
        });

        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const parsedResume = {
            ...resume,
            Experience: resume.experience ? JSON.parse(resume.experience) : [],
            education: resume.education ? JSON.parse(resume.education) : [],
            skills: resume.skills ? JSON.parse(resume.skills) : [],
            Projects: resume.projects ? JSON.parse(resume.projects) : [],
            Certifications: resume.certifications ? JSON.parse(resume.certifications) : [],
            languages: resume.languages ? JSON.parse(resume.languages) : [],
            awards: resume.awards ? JSON.parse(resume.awards) : [],
            publications: resume.publications ? JSON.parse(resume.publications) : [],
            references: resume.references ? JSON.parse(resume.references) : [],
            hobbies: resume.hobbies ? JSON.parse(resume.hobbies) : [],
            volunteer: resume.volunteer ? JSON.parse(resume.volunteer) : [],
            courses: resume.courses ? JSON.parse(resume.courses) : [],
            customSections: resume.customSections ? JSON.parse(resume.customSections) : [],
            socialLinks: resume.socialLinks ? JSON.parse(resume.socialLinks) : [],
            templateSettings: resume.templateSettings ? JSON.parse(resume.templateSettings) : {},
        };

        res.json({
            data: {
                documentId: resume.resumeId,
                ...parsedResume
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
};

const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = req.body;
        const { userId } = req.auth;

        // Verify ownership before update
        // (Optional/Strict: check if resume belongs to userId)
        // For now we assume if they have the ID they can edit, 
        // BUT best practice is to check owner.

        const count = await prisma.userResume.count({
            where: { resumeId: id, userId: userId }
        });

        if (count === 0) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        const updateData = { ...data };

        // Handle uppercase field names (from frontend forms)
        if (updateData.Experience) {
            updateData.experience = JSON.stringify(updateData.Experience);
            delete updateData.Experience;
        }
        if (updateData.Education) {
            updateData.education = JSON.stringify(updateData.Education);
            delete updateData.Education;
        }
        if (updateData.Skills) {
            updateData.skills = JSON.stringify(updateData.Skills);
            delete updateData.Skills;
        }
        if (updateData.Projects) {
            updateData.projects = JSON.stringify(updateData.Projects);
            delete updateData.Projects;
        }
        if (updateData.Certifications) {
            updateData.certifications = JSON.stringify(updateData.Certifications);
            delete updateData.Certifications;
        }

        // Handle all array/object fields (both lowercase and any that might have been missed)
        const jsonFields = [
            'experience', 'education', 'skills', 'projects', 'certifications',
            'languages', 'awards', 'publications', 'references', 'hobbies',
            'volunteer', 'courses', 'customSections', 'socialLinks', 'templateSettings'
        ];
        jsonFields.forEach(field => {
            if (updateData[field] && typeof updateData[field] === 'object') {
                updateData[field] = JSON.stringify(updateData[field]);
            }
        });

        const updatedResume = await prisma.userResume.update({
            where: { resumeId: id },
            data: updateData
        });

        res.json({
            data: {
                documentId: updatedResume.resumeId,
                ...updatedResume
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update resume' });
    }
};

const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.auth;

        // Verify ownership
        const count = await prisma.userResume.count({
            where: { resumeId: id, userId: userId }
        });

        if (count === 0) {
            return res.status(403).json({ error: "Unauthorized access" });
        }

        await prisma.userResume.delete({
            where: { resumeId: id }
        });
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete resume' });
    }
};

const cloneResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { newResumeId } = req.body;
        const { userId } = req.auth;

        // Find original resume
        const originalResume = await prisma.userResume.findUnique({
            where: { resumeId: id }
        });

        if (!originalResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        // Verify ownership
        if (originalResume.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Create cloned resume
        const clonedResume = await prisma.userResume.create({
            data: {
                resumeId: newResumeId,
                title: originalResume.title + ' (Copy)',
                userEmail: originalResume.userEmail,
                userName: originalResume.userName,
                themeColor: originalResume.themeColor,
                firstName: originalResume.firstName,
                lastName: originalResume.lastName,
                jobTitle: originalResume.jobTitle,
                address: originalResume.address,
                phone: originalResume.phone,
                email: originalResume.email,
                summary: originalResume.summary,
                experience: originalResume.experience,
                education: originalResume.education,
                skills: originalResume.skills,
                projects: originalResume.projects,
                certifications: originalResume.certifications,
                userId: userId
            }
        });

        res.status(201).json({
            data: {
                documentId: clonedResume.resumeId,
                ...clonedResume
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to clone resume' });
    }
};

module.exports = {
    createResume,
    getAllResumes,
    getResumeById,
    updateResume,
    deleteResume,
    cloneResume
};
