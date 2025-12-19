import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailPreview from './preview/PersonalDetailPreview'
import SummeryPreview from './preview/SummeryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationalPreview from './preview/EducationalPreview'
import SkillsPreview from './preview/SkillsPreview'
import ProjectsPreview from './preview/ProjectsPreview'
import CertificationsPreview from './preview/CertificationsPreview'

// Templates
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import MinimalTemplate from './templates/MinimalTemplate'
import ProfessionalTemplate from './templates/ProfessionalTemplate'

const TEMPLATES = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    professional: ProfessionalTemplate,
}

function ResumePreview() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

    const selectedTemplate = resumeInfo?.template || 'classic';
    const TemplateComponent = TEMPLATES[selectedTemplate];

    // If a template is selected and exists, render it
    if (TemplateComponent) {
        return (
            <div className='shadow-lg h-full overflow-hidden rounded-lg'>
                <TemplateComponent resumeInfo={resumeInfo} />
            </div>
        )
    }

    // Default fallback (original preview)
    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
            style={{
                borderColor: resumeInfo?.themeColor
            }}>
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            <SummeryPreview resumeInfo={resumeInfo} />
            {resumeInfo?.Experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
            {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
            {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
            {resumeInfo?.Projects?.length > 0 && <ProjectsPreview resumeInfo={resumeInfo} />}
            {resumeInfo?.Certifications?.length > 0 && <CertificationsPreview resumeInfo={resumeInfo} />}
        </div>
    )
}

export default ResumePreview