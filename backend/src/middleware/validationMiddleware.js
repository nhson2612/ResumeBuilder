const { z } = require('zod');

// Schema for individual experience entry
const ExperienceSchema = z.object({
    title: z.string().optional(),
    companyName: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean().optional(),
    workSummary: z.string().optional(),
}).passthrough();

// Schema for individual education entry
const EducationSchema = z.object({
    universityName: z.string().optional(),
    degree: z.string().optional(),
    major: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
}).passthrough();

// Schema for individual skill entry
const SkillSchema = z.object({
    name: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
}).passthrough();

// Schema for individual project entry
const ProjectSchema = z.object({
    projectName: z.string().optional(),
    techStack: z.string().optional(),
    projectUrl: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
}).passthrough();

// Schema for individual certification entry
const CertificationSchema = z.object({
    certName: z.string().optional(),
    issuer: z.string().optional(),
    issueDate: z.string().optional(),
    credentialUrl: z.string().optional(),
}).passthrough();

// Schema for creating a new resume
const CreateResumeSchema = z.object({
    data: z.object({
        title: z.string().min(1, "Title is required"),
        resumeId: z.string().min(1, "Resume ID is required"),
        userEmail: z.string().email().optional().or(z.literal('')),
        userName: z.string().optional(),
    })
});

// Schema for updating a resume
const UpdateResumeSchema = z.object({
    data: z.object({
        title: z.string().optional(),
        themeColor: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        jobTitle: z.string().optional(),
        address: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional().or(z.literal('')),
        summary: z.string().optional(),
        Experience: z.array(ExperienceSchema).optional(),
        Education: z.array(EducationSchema).optional(),
        Skills: z.array(SkillSchema).optional(),
        Projects: z.array(ProjectSchema).optional(),
        Certifications: z.array(CertificationSchema).optional(),
    }).passthrough()
});

// Generic validation middleware factory
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const messages = error.errors.map(e => `${e.path.join('.')}: ${e.message}`);
            return res.status(400).json({
                error: 'Validation failed',
                details: messages
            });
        }
        return res.status(500).json({ error: 'Internal server error during validation' });
    }
};

module.exports = {
    CreateResumeSchema,
    UpdateResumeSchema,
    validate
};
