import React from 'react';
import { useTranslation } from 'react-i18next';

// Primitives
import {
    HeaderBlock,
    SectionTitle,
    SkillBadge,
    DateRange,
    BulletList
} from './primitives';

// Layouts
import { SingleColumnLayout } from './layouts';

/**
 * Minimal Template - Ultra-clean design with perfect whitespace and modern typography
 * 
 * Uses SingleColumnLayout with grid-based experience/education sections.
 * Best for: Design professionals, startups, modern tech companies.
 */
function MinimalTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#18181b';
    const accentColor = resumeInfo?.accentColor || '#71717a';
    const fontFamily = "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif";

    // Header using HeaderBlock primitive with minimal variant
    const header = (
        <HeaderBlock
            resumeInfo={resumeInfo}
            variant="minimal"
            themeColor={themeColor}
            fontFamily={fontFamily}
            showAvatar={false}
        />
    );

    return (
        <SingleColumnLayout
            header={header}
            fontFamily={fontFamily}
            padding="px-10 py-10"
            gap="space-y-0"
            bgColor="bg-white"
        >
            {/* Summary */}
            {resumeInfo?.summary && (
                <div className="mb-8">
                    <p className="text-xs text-gray-500 leading-relaxed max-w-2xl">
                        {resumeInfo.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {resumeInfo?.Experience?.length > 0 && (
                <div className="mb-8">
                    <SectionTitle
                        title={t('resume.sections.experience')}
                        variant="minimal"
                        themeColor={accentColor}
                    />
                    <div className="space-y-5">
                        {resumeInfo.Experience.map((exp, index) => (
                            <div key={index} className="grid grid-cols-[100px_1fr] gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 leading-tight">
                                        {exp?.startDate}
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className="font-semibold text-sm leading-tight"
                                        style={{ color: themeColor }}
                                    >
                                        {exp?.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {exp?.companyName}
                                        {exp?.city && ` · ${exp.city}`}
                                    </p>
                                    <BulletList
                                        content={exp?.workSummery}
                                        bulletStyle="dot"
                                        themeColor={accentColor}
                                        textClass="text-[11px] text-gray-500 leading-relaxed"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
                <div className="mb-8">
                    <SectionTitle
                        title={t('resume.sections.education')}
                        variant="minimal"
                        themeColor={accentColor}
                    />
                    <div className="space-y-4">
                        {resumeInfo.education.map((edu, index) => (
                            <div key={index} className="grid grid-cols-[100px_1fr] gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 leading-tight">
                                        {edu?.startDate}
                                    </p>
                                    <p className="text-[10px] text-gray-400">
                                        {edu?.endDate}
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className="font-semibold text-sm leading-tight"
                                        style={{ color: themeColor }}
                                    >
                                        {edu?.degree} {edu?.major && `in ${edu.major}`}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5">{edu?.universityName}</p>
                                    {edu?.gpa && (
                                        <p className="text-[10px] text-gray-400 mt-0.5">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && (
                <div className="mb-8">
                    <SectionTitle
                        title={t('resume.sections.skills')}
                        variant="minimal"
                        themeColor={accentColor}
                    />
                    <p className="text-xs text-gray-500 leading-relaxed">
                        {resumeInfo.skills.map(skill => skill?.name).join('  ·  ')}
                    </p>
                </div>
            )}

            {/* Projects */}
            {resumeInfo?.Projects?.length > 0 && (
                <div className="mb-8">
                    <SectionTitle
                        title={t('resume.sections.projects')}
                        variant="minimal"
                        themeColor={accentColor}
                    />
                    <div className="space-y-4">
                        {resumeInfo.Projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex items-baseline gap-3">
                                    <h4
                                        className="font-semibold text-sm"
                                        style={{ color: themeColor }}
                                    >
                                        {proj?.projectName}
                                    </h4>
                                    {proj?.techStack && (
                                        <span className="text-[10px] text-gray-400">
                                            {proj.techStack}
                                        </span>
                                    )}
                                </div>
                                <BulletList
                                    content={proj?.description}
                                    bulletStyle="dot"
                                    themeColor={accentColor}
                                    textClass="text-[11px] text-gray-500 leading-relaxed"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications & Languages - Inline */}
            <div className="flex gap-10">
                {resumeInfo?.Certifications?.length > 0 && (
                    <div className="flex-1">
                        <SectionTitle
                            title={t('resume.sections.certifications')}
                            variant="minimal"
                            themeColor={accentColor}
                        />
                        <div className="space-y-1">
                            {resumeInfo.Certifications.map((cert, index) => (
                                <p key={index} className="text-xs text-gray-500">
                                    <span className="font-medium" style={{ color: themeColor }}>
                                        {cert?.certName}
                                    </span>
                                    {cert?.issuer && (
                                        <span className="text-gray-400"> · {cert.issuer}</span>
                                    )}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {resumeInfo?.languages?.length > 0 && (
                    <div className="flex-1">
                        <SectionTitle
                            title={t('resume.sections.languages')}
                            variant="minimal"
                            themeColor={accentColor}
                        />
                        <div className="space-y-1">
                            {resumeInfo.languages.map((lang, index) => (
                                <p key={index} className="text-xs">
                                    <span className="font-medium" style={{ color: themeColor }}>
                                        {lang?.language}
                                    </span>
                                    <span className="text-gray-400"> · {lang?.proficiency}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SingleColumnLayout>
    );
}

export default MinimalTemplate;
