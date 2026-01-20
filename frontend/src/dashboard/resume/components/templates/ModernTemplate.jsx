import React from 'react';
import { useTranslation } from 'react-i18next';

// Primitives
import {
    Avatar,
    SectionTitle,
    SkillBadge,
    DateRange,
    TimelineItem,
    BulletList
} from './primitives';
import { EmailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GithubIcon } from './primitives/ContactInfo';

// Layouts
import { SidebarLayout } from './layouts';

/**
 * Modern Template - Two-column layout with sidebar, refined typography, and professional icons
 * 
 * Uses SidebarLayout with colored sidebar containing contact, skills, languages, certifications.
 * Main content has summary, experience, education, projects.
 * Best for: Tech industry, creative fields, modern companies.
 */
function ModernTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#4f46e5';
    const fontFamily = resumeInfo?.fontFamily || "'Inter', system-ui, sans-serif";

    // Sidebar content
    const sidebarContent = (
        <>
            {/* Avatar */}
            <Avatar
                photoUrl={resumeInfo?.photoUrl}
                firstName={resumeInfo?.firstName}
                lastName={resumeInfo?.lastName}
                size="lg"
                variant="rounded"
                className="mx-auto mb-5"
            />

            {/* Contact */}
            <div className="mb-6">
                <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2">
                    <EmailIcon className="w-3.5 h-3.5" />
                    {t('resume.sections.personal')}
                </h3>
                <div className="space-y-2.5">
                    {resumeInfo?.email && (
                        <div className="flex items-start gap-2.5 text-[10px]">
                            <EmailIcon className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" />
                            <span className="break-all leading-relaxed">{resumeInfo.email}</span>
                        </div>
                    )}
                    {resumeInfo?.phone && (
                        <div className="flex items-start gap-2.5 text-[10px]">
                            <PhoneIcon className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" />
                            <span>{resumeInfo.phone}</span>
                        </div>
                    )}
                    {(resumeInfo?.address || resumeInfo?.city) && (
                        <div className="flex items-start gap-2.5 text-[10px]">
                            <LocationIcon className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" />
                            <span>{resumeInfo.address}{resumeInfo.city && `, ${resumeInfo.city}`}</span>
                        </div>
                    )}
                    {resumeInfo?.linkedIn && (
                        <div className="flex items-start gap-2.5 text-[10px]">
                            <LinkedInIcon className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" />
                            <span className="break-all">{resumeInfo.linkedIn}</span>
                        </div>
                    )}
                    {resumeInfo?.github && (
                        <div className="flex items-start gap-2.5 text-[10px]">
                            <GithubIcon className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" />
                            <span className="break-all">{resumeInfo.github}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        {t('resume.sections.skills')}
                    </h3>
                    <div className="space-y-2.5">
                        {resumeInfo.skills.map((skill, index) => (
                            <SkillBadge
                                key={index}
                                name={skill?.name}
                                rating={skill?.rating || 3}
                                variant="bar"
                                showRating={true}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Languages */}
            {resumeInfo?.languages?.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                        </svg>
                        {t('resume.sections.languages')}
                    </h3>
                    <div className="space-y-1.5">
                        {resumeInfo.languages.map((lang, index) => (
                            <div key={index} className="flex justify-between text-[10px]">
                                <span className="font-medium">{lang?.language}</span>
                                <span className="opacity-70 text-[9px] bg-white/15 px-2 py-0.5 rounded-full">
                                    {lang?.proficiency}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resumeInfo?.Certifications?.length > 0 && (
                <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {t('resume.sections.certifications')}
                    </h3>
                    <div className="space-y-2.5">
                        {resumeInfo.Certifications.map((cert, index) => (
                            <div key={index} className="text-[10px]">
                                <p className="font-semibold leading-tight">{cert?.certName}</p>
                                <p className="opacity-70 text-[9px]">
                                    {cert?.issuer} {cert?.issueDate && `• ${cert.issueDate}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

    // Main content
    const mainContent = (
        <>
            {/* Header */}
            <div className="mb-5 pb-4 border-b-2" style={{ borderColor: themeColor }}>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                    {resumeInfo?.firstName} {resumeInfo?.lastName}
                </h1>
                <h2
                    className="text-sm font-semibold mt-1 tracking-wide"
                    style={{ color: themeColor }}
                >
                    {resumeInfo?.jobTitle}
                </h2>
            </div>

            {/* Summary */}
            {(resumeInfo?.summary || resumeInfo?.objective) && (
                <div className="mb-5">
                    <SectionTitle
                        title={t('resume.sections.summary')}
                        variant="accent-bar"
                        themeColor={themeColor}
                    />
                    <p className="text-xs text-gray-600 leading-relaxed">
                        {resumeInfo?.summary || resumeInfo?.objective}
                    </p>
                </div>
            )}

            {/* Experience */}
            {resumeInfo?.Experience?.length > 0 && (
                <div className="mb-5">
                    <SectionTitle
                        title={t('resume.sections.experience')}
                        variant="accent-bar"
                        themeColor={themeColor}
                    />
                    <div className="space-y-4">
                        {resumeInfo.Experience.map((exp, index) => (
                            <TimelineItem
                                key={index}
                                variant="dot"
                                themeColor={themeColor}
                            >
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-semibold text-sm text-gray-800">{exp?.title}</h4>
                                    <DateRange
                                        startDate={exp?.startDate}
                                        endDate={exp?.endDate}
                                        isCurrent={exp?.currentlyWorking}
                                        variant="badge"
                                        themeColor={themeColor}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 font-medium">
                                    {exp?.companyName}{exp?.city && ` • ${exp?.city}`}
                                </p>
                                <BulletList
                                    content={exp?.workSummery}
                                    bulletStyle="dot"
                                    themeColor={themeColor}
                                />
                            </TimelineItem>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
                <div className="mb-5">
                    <SectionTitle
                        title={t('resume.sections.education')}
                        variant="accent-bar"
                        themeColor={themeColor}
                    />
                    <div className="space-y-3">
                        {resumeInfo.education.map((edu, index) => (
                            <TimelineItem
                                key={index}
                                variant="dot"
                                themeColor={themeColor}
                            >
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-semibold text-sm text-gray-800">
                                        {edu?.degree} {edu?.major && `in ${edu.major}`}
                                    </h4>
                                    <DateRange
                                        startDate={edu?.startDate}
                                        endDate={edu?.endDate}
                                        variant="text"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">{edu?.universityName}</p>
                                {edu?.gpa && (
                                    <p className="text-[10px] text-gray-400">GPA: {edu.gpa}</p>
                                )}
                            </TimelineItem>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resumeInfo?.Projects?.length > 0 && (
                <div className="mb-5">
                    <SectionTitle
                        title={t('resume.sections.projects')}
                        variant="accent-bar"
                        themeColor={themeColor}
                    />
                    <div className="space-y-3">
                        {resumeInfo.Projects.map((proj, index) => (
                            <TimelineItem
                                key={index}
                                variant="dot"
                                themeColor={themeColor}
                            >
                                <h4 className="font-semibold text-sm text-gray-800">{proj?.projectName}</h4>
                                {proj?.techStack && (
                                    <p className="text-[9px] text-gray-500 italic">{proj.techStack}</p>
                                )}
                                <BulletList
                                    content={proj?.description}
                                    bulletStyle="dot"
                                    themeColor={themeColor}
                                />
                            </TimelineItem>
                        ))}
                    </div>
                </div>
            )}

            {/* Awards */}
            {resumeInfo?.awards?.length > 0 && (
                <div>
                    <SectionTitle
                        title={t('resume.sections.awards')}
                        variant="accent-bar"
                        themeColor={themeColor}
                    />
                    <ul className="space-y-1">
                        {resumeInfo.awards.map((award, index) => (
                            <li key={index} className="text-xs text-gray-600">
                                <span className="font-medium text-gray-800">{award?.title}</span>
                                {award?.issuer && ` – ${award.issuer}`}
                                {award?.date && ` (${award.date})`}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    return (
        <SidebarLayout
            sidebar={sidebarContent}
            main={mainContent}
            sidebarPosition="left"
            sidebarWidth="34%"
            sidebarBgColor={themeColor}
            fontFamily={fontFamily}
        />
    );
}

export default ModernTemplate;
