// Template configurations with their specific field requirements
// Each template has different focus and required fields

export const TEMPLATE_CONFIGS = {
    classic: {
        id: 'classic',
        name: 'Classic',
        description: 'Truyền thống, phù hợp mọi ngành nghề',
        emoji: '📄',
        color: '#4F46E5',
        previewImage: '/templates/classic-preview.png',

        // Fields this template emphasizes
        sections: [
            'personalInfo',
            'summary',
            'experience',
            'education',
            'skills',
            'certifications'
        ],

        // Field structure for this template
        fields: {
            personalInfo: {
                required: ['firstName', 'lastName', 'email', 'phone', 'jobTitle'],
                optional: ['address', 'city', 'country', 'linkedIn']
            },
            summary: {
                required: true,
                minLength: 100,
                maxLength: 500
            },
            experience: {
                minCount: 1,
                fields: ['title', 'companyName', 'city', 'startDate', 'endDate', 'workSummery'],
                bulletPoints: 3
            },
            education: {
                minCount: 1,
                fields: ['universityName', 'degree', 'major', 'startDate', 'endDate']
            },
            skills: {
                minCount: 5,
                withRating: true
            }
        },

        // AI prompt additions for this template
        aiPromptAdditions: `
Template này phù hợp cho CV truyền thống, chuyên nghiệp.
Hãy hỏi về:
- Kinh nghiệm làm việc chi tiết với 3-5 bullet points mô tả trách nhiệm và thành tích
- Học vấn đầy đủ với GPA nếu cao
- Kỹ năng phân loại rõ (Technical, Soft skills)`
    },

    modern: {
        id: 'modern',
        name: 'Modern',
        description: 'Hiện đại, sidebar, phù hợp IT/Creative',
        emoji: '🎨',
        color: '#7C3AED',
        previewImage: '/templates/modern-preview.png',

        sections: [
            'personalInfo',
            'summary',
            'experience',
            'education',
            'skills',
            'projects',
            'languages',
            'certifications'
        ],

        fields: {
            personalInfo: {
                required: ['firstName', 'lastName', 'email', 'phone', 'jobTitle'],
                optional: ['address', 'city', 'linkedIn', 'github', 'website', 'photoUrl']
            },
            summary: {
                required: true,
                minLength: 80,
                maxLength: 300
            },
            experience: {
                minCount: 1,
                fields: ['title', 'companyName', 'city', 'startDate', 'endDate', 'workSummery', 'achievements'],
                bulletPoints: 4
            },
            education: {
                minCount: 1,
                fields: ['universityName', 'degree', 'major', 'startDate', 'endDate', 'gpa']
            },
            skills: {
                minCount: 6,
                withRating: true,
                categories: ['Technical', 'Frameworks', 'Tools']
            },
            projects: {
                minCount: 2,
                fields: ['projectName', 'techStack', 'description', 'projectUrl']
            },
            languages: {
                minCount: 1
            }
        },

        aiPromptAdditions: `
Template Modern dành cho ngành IT/Creative với sidebar.
QUAN TRỌNG - Hỏi thêm:
- GitHub, Portfolio, Website
- Dự án cá nhân với tech stack chi tiết
- Ngôn ngữ (tiếng Anh, IELTS/TOEIC)
- Skills chia theo categories: Languages, Frameworks, Tools, Databases`
    },

    minimal: {
        id: 'minimal',
        name: 'Minimal',
        description: 'Tối giản, nhiều khoảng trắng, sang trọng',
        emoji: '✨',
        color: '#374151',
        previewImage: '/templates/minimal-preview.png',

        sections: [
            'personalInfo',
            'summary',
            'experience',
            'education',
            'skills'
        ],

        fields: {
            personalInfo: {
                required: ['firstName', 'lastName', 'email', 'phone', 'jobTitle'],
                optional: ['city', 'linkedIn']
            },
            summary: {
                required: true,
                minLength: 50,
                maxLength: 200
            },
            experience: {
                minCount: 2,
                fields: ['title', 'companyName', 'startDate', 'endDate', 'workSummery'],
                bulletPoints: 2
            },
            education: {
                minCount: 1,
                fields: ['universityName', 'degree', 'major', 'endDate']
            },
            skills: {
                minCount: 6,
                withRating: false
            }
        },

        aiPromptAdditions: `
Template Minimal - tối giản, tinh tế.
Hướng dẫn:
- Summary ngắn gọn, súc tích (1-2 câu)
- Mỗi kinh nghiệm chỉ 2 bullet points quan trọng nhất
- Skills liệt kê gọn, không cần rating
- Không cần quá nhiều chi tiết`
    },

    professional: {
        id: 'professional',
        name: 'Professional',
        description: 'Doanh nghiệp, executive, đầy đủ nhất',
        emoji: '💼',
        color: '#1E40AF',
        previewImage: '/templates/professional-preview.png',

        sections: [
            'personalInfo',
            'objective',
            'summary',
            'experience',
            'education',
            'skills',
            'projects',
            'certifications',
            'languages',
            'awards',
            'references'
        ],

        fields: {
            personalInfo: {
                required: ['firstName', 'lastName', 'email', 'phone', 'jobTitle', 'address'],
                optional: ['city', 'country', 'linkedIn', 'github', 'website', 'photoUrl', 'nationality']
            },
            objective: {
                required: false,
                maxLength: 200
            },
            summary: {
                required: true,
                minLength: 150,
                maxLength: 500
            },
            experience: {
                minCount: 2,
                fields: ['title', 'companyName', 'city', 'state', 'startDate', 'endDate', 'workSummery', 'achievements'],
                bulletPoints: 5
            },
            education: {
                minCount: 1,
                fields: ['universityName', 'degree', 'major', 'startDate', 'endDate', 'gpa', 'description']
            },
            skills: {
                minCount: 8,
                withRating: true,
                categories: ['Core Competencies', 'Technical Skills', 'Soft Skills']
            },
            projects: {
                minCount: 1,
                fields: ['projectName', 'techStack', 'description', 'startDate', 'endDate']
            },
            certifications: {
                minCount: 0,
                fields: ['certName', 'issuer', 'issueDate', 'credentialId']
            },
            languages: {
                minCount: 1
            },
            awards: {
                minCount: 0
            },
            references: {
                minCount: 0
            }
        },

        aiPromptAdditions: `
Template Professional - ĐẦY ĐỦ NHẤT cho executive/manager.
BẮT BUỘC hỏi chi tiết:
- Professional Summary dài 3-4 câu, thể hiện value proposition
- Mỗi kinh nghiệm: 4-5 bullet points với METRICS cụ thể (%, số lượng, revenue)
- Achievements/Accomplishments nổi bật
- Chứng chỉ chuyên ngành
- Giải thưởng, thành tích
- Ngôn ngữ với level cụ thể
- References nếu có (tên, chức vụ, công ty, email)`
    }
}

// Generate AI prompt based on template
export const generateTemplatePrompt = (templateId) => {
    const config = TEMPLATE_CONFIGS[templateId]
    if (!config) return ''

    const sectionsText = config.sections.map(s => `- ${s}`).join('\n')

    return `
## TEMPLATE ĐƯỢC CHỌN: ${config.name} (${config.emoji})
${config.description}

### CÁC PHẦN CẦN THU THẬP:
${sectionsText}

${config.aiPromptAdditions}

### YÊU CẦU CHI TIẾT:
${config.fields.experience?.bulletPoints ? `- Mỗi kinh nghiệm cần ${config.fields.experience.bulletPoints} bullet points` : ''}
${config.fields.skills?.minCount ? `- Tối thiểu ${config.fields.skills.minCount} kỹ năng` : ''}
${config.fields.summary?.minLength ? `- Summary tối thiểu ${config.fields.summary.minLength} ký tự` : ''}
`
}

export default TEMPLATE_CONFIGS
