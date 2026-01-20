import React from 'react';
import { useTranslation } from 'react-i18next';

// Primitives
import { HeaderBlock, SectionTitle } from './primitives';

// Layouts
import { SingleColumnLayout } from './layouts';

// Existing section components (reused)
import ResumeSummary from '../resume-sections/ResumeSummary';
import ResumeExperience from '../resume-sections/ResumeExperience';
import ResumeEducation from '../resume-sections/ResumeEducation';
import ResumeSkills from '../resume-sections/ResumeSkills';
import ResumeProjects from '../resume-sections/ResumeProjects';
import ResumeCertifications from '../resume-sections/ResumeCertifications';

/**
 * Classic Template - Elegant traditional design with refined typography
 * 
 * Uses SingleColumnLayout with centered header and underlined section titles.
 * Best for: Traditional industries, academic positions, formal applications.
 */
function ClassicTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#1e3a5f';
    const fontFamily = "'Merriweather', 'Georgia', serif";

    // Shared styling for section titles
    const sectionTitleClass = 'text-sm font-bold uppercase tracking-widest pb-1.5 mb-3 border-b';

    // Header component
    const header = (
        <HeaderBlock
            resumeInfo={resumeInfo}
            variant="centered"
            themeColor={themeColor}
            fontFamily={fontFamily}
            showAvatar={false}
            contactLayout="horizontal"
        />
    );

    return (
        <SingleColumnLayout
            header={header}
            fontFamily={fontFamily}
            padding="px-8 py-5"
            gap="space-y-5"
        >
            <ResumeSummary
                summary={resumeInfo?.summary}
                themeColor={themeColor}
                classes={{ title: sectionTitleClass }}
            />

            <ResumeExperience
                data={resumeInfo?.Experience}
                themeColor={themeColor}
                classes={{ title: sectionTitleClass }}
            />

            <ResumeEducation
                data={resumeInfo?.education}
                themeColor={themeColor}
                classes={{ title: sectionTitleClass }}
            />

            <ResumeSkills
                data={resumeInfo?.skills}
                themeColor={themeColor}
                classes={{ title: sectionTitleClass }}
            />

            <ResumeProjects
                data={resumeInfo?.Projects}
                themeColor={themeColor}
                classes={{ title: sectionTitleClass }}
            />

            <ResumeCertifications
                data={resumeInfo?.Certifications}
                themeColor={themeColor}
                classes={{ title: sectionTitleClass }}
            />
        </SingleColumnLayout>
    );
}

export default ClassicTemplate;
