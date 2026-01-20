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
import { ContactInfo } from './primitives';

// Layouts
import { TwoColumnLayout } from './layouts';

// Icons
const ExperienceIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
    </svg>
);

const EducationIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
    </svg>
);

const ProjectIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zm11-1a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
    </svg>
);

const SkillsIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
    </svg>
);

const CertIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const LanguageIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
    </svg>
);

const AwardIcon = () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

/**
 * Creative Template - Bold, modern design with asymmetric layout
 * 
 * Features gradient styling, decorative shapes, pill-style contacts.
 * Uses TwoColumnLayout with 62/38 split.
 * Best for: Creative industries, designers, marketing professionals.
 */
function CreativeTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#7c3aed';
    const secondaryColor = resumeInfo?.accentColor || '#ec4899';
    const fontFamily = "'Poppins', 'Inter', system-ui, sans-serif";

    // Create gradient style
    const gradientStyle = {
        background: `linear-gradient(135deg, ${themeColor} 0%, ${secondaryColor} 100%)`
    };

    // Header component
    const header = (
        <>
            {/* Hero Header */}
            <div className="relative">
                {/* Decorative shapes */}
                <div
                    className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
                    style={gradientStyle}
                />
                <div
                    className="absolute top-20 right-20 w-20 h-20 rounded-full opacity-10"
                    style={gradientStyle}
                />

                <div className="relative px-8 pt-8 pb-6">
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <Avatar
                            photoUrl={resumeInfo?.photoUrl}
                            firstName={resumeInfo?.firstName}
                            lastName={resumeInfo?.lastName}
                            size="xl"
                            variant="rounded"
                            gradient={{ from: themeColor, to: secondaryColor }}
                        />

                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                {resumeInfo?.firstName}{' '}
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={gradientStyle}
                                >
                                    {resumeInfo?.lastName}
                                </span>
                            </h1>
                            <h2 className="text-sm font-semibold text-gray-500 mt-1 tracking-wide">
                                {resumeInfo?.jobTitle}
                            </h2>

                            {/* Contact Pills */}
                            <ContactInfo
                                email={resumeInfo?.email}
                                phone={resumeInfo?.phone}
                                address={resumeInfo?.address}
                                linkedIn={resumeInfo?.linkedIn}
                                layout="pills"
                                showIcons={true}
                                themeColor={themeColor}
                                className="mt-3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary */}
            {resumeInfo?.summary && (
                <div className="px-8 pb-4">
                    <div
                        className="relative p-4 rounded-xl bg-gradient-to-r from-gray-50 to-transparent border-l-4"
                        style={{ borderColor: themeColor }}
                    >
                        <p className="text-xs text-gray-600 leading-relaxed">
                            {resumeInfo.summary}
                        </p>
                    </div>
                </div>
            )}
        </>
    );

    // Left column content (62%)
    const leftColumn = (
        <>
            {/* Experience */}
            {resumeInfo?.Experience?.length > 0 && (
                <div className="mb-5">
                    <SectionTitle
                        title={t('resume.sections.experience')}
                        icon={<ExperienceIcon />}
                        variant="gradient"
                        themeColor={themeColor}
                        accentColor={secondaryColor}
                    />

                    <div className="space-y-4 ml-4 border-l-2 border-gray-200 pl-5">
                        {resumeInfo.Experience.map((exp, index) => (
                            <div key={index} className="relative">
                                <div
                                    className="absolute -left-[27px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                                    style={gradientStyle}
                                />
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-sm text-gray-900">{exp?.title}</h4>
                                        <p className="text-xs text-gray-500 font-medium">
                                            {exp?.companyName}
                                            {exp?.city && ` • ${exp.city}`}
                                        </p>
                                    </div>
                                    <DateRange
                                        startDate={exp?.startDate}
                                        endDate={exp?.endDate}
                                        isCurrent={exp?.currentlyWorking}
                                        variant="gradient"
                                        themeColor={themeColor}
                                        accentColor={secondaryColor}
                                    />
                                </div>
                                <BulletList
                                    content={exp?.workSummery}
                                    bulletStyle="square"
                                    themeColor={themeColor}
                                    accentColor={secondaryColor}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resumeInfo?.Projects?.length > 0 && (
                <div className="mb-5">
                    <SectionTitle
                        title={t('resume.sections.projects')}
                        icon={<ProjectIcon />}
                        variant="gradient"
                        themeColor={themeColor}
                        accentColor={secondaryColor}
                    />

                    <div className="grid grid-cols-1 gap-3">
                        {resumeInfo.Projects.map((proj, index) => (
                            <div
                                key={index}
                                className="p-3 rounded-xl bg-gray-50 border border-gray-100"
                            >
                                <h4 className="font-bold text-sm text-gray-900">{proj?.projectName}</h4>
                                {proj?.techStack && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                        {proj.techStack.split(',').map((tech, i) => (
                                            <span
                                                key={i}
                                                className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: `${themeColor}15`,
                                                    color: themeColor
                                                }}
                                            >
                                                {tech.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <BulletList
                                    content={proj?.description}
                                    bulletStyle="square"
                                    themeColor={themeColor}
                                    accentColor={secondaryColor}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
                <div>
                    <SectionTitle
                        title={t('resume.sections.education')}
                        icon={<EducationIcon />}
                        variant="gradient"
                        themeColor={themeColor}
                        accentColor={secondaryColor}
                    />

                    <div className="space-y-3">
                        {resumeInfo.education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-sm text-gray-900">
                                        {edu?.degree} {edu?.major && `in ${edu.major}`}
                                    </h4>
                                    <p className="text-xs text-gray-500">{edu?.universityName}</p>
                                </div>
                                <DateRange
                                    startDate={edu?.startDate}
                                    endDate={edu?.endDate}
                                    variant="text"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

    // Right column content (38%)
    const rightColumn = (
        <>
            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && (
                <div
                    className="p-4 rounded-2xl border"
                    style={{
                        borderColor: `${themeColor}30`,
                        background: `linear-gradient(135deg, ${themeColor}08 0%, ${secondaryColor}08 100%)`
                    }}
                >
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span style={{ color: themeColor }}><SkillsIcon /></span>
                        {t('resume.sections.skills')}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                        {resumeInfo.skills.map((skill, index) => (
                            <SkillBadge
                                key={index}
                                name={skill?.name}
                                variant="gradient"
                                themeColor={themeColor}
                                accentColor={secondaryColor}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resumeInfo?.Certifications?.length > 0 && (
                <div
                    className="p-4 rounded-2xl border"
                    style={{
                        borderColor: `${themeColor}30`,
                        background: `linear-gradient(135deg, ${themeColor}05 0%, ${secondaryColor}05 100%)`
                    }}
                >
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span style={{ color: themeColor }}><CertIcon /></span>
                        {t('resume.sections.certifications')}
                    </h3>
                    <div className="space-y-2">
                        {resumeInfo.Certifications.map((cert, index) => (
                            <div
                                key={index}
                                className="p-2 rounded-lg bg-white/50"
                            >
                                <p className="text-xs font-semibold text-gray-800">{cert?.certName}</p>
                                <p className="text-[10px] text-gray-500">
                                    {cert?.issuer} {cert?.issueDate && `• ${cert.issueDate}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Languages */}
            {resumeInfo?.languages?.length > 0 && (
                <div
                    className="p-4 rounded-2xl border"
                    style={{ borderColor: `${themeColor}30` }}
                >
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span style={{ color: themeColor }}><LanguageIcon /></span>
                        {t('resume.sections.languages')}
                    </h3>
                    <div className="space-y-2">
                        {resumeInfo.languages.map((lang, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <span className="text-xs font-medium text-gray-700">{lang?.language}</span>
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                background: level <= (lang?.level || 3)
                                                    ? `linear-gradient(135deg, ${themeColor} 0%, ${secondaryColor} 100%)`
                                                    : '#e5e7eb'
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Awards */}
            {resumeInfo?.awards?.length > 0 && (
                <div
                    className="p-4 rounded-2xl border"
                    style={{ borderColor: `${themeColor}30` }}
                >
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span style={{ color: themeColor }}><AwardIcon /></span>
                        {t('resume.sections.awards')}
                    </h3>
                    <div className="space-y-2">
                        {resumeInfo.awards.map((award, index) => (
                            <div key={index}>
                                <p className="text-xs font-semibold text-gray-800">{award?.title}</p>
                                <p className="text-[10px] text-gray-500">
                                    {award?.issuer} {award?.date && `• ${award.date}`}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );

    return (
        <div
            className="bg-gradient-to-br from-slate-50 to-white h-full overflow-hidden"
            style={{ fontFamily }}
        >
            {header}
            <div className="flex px-8 py-4 gap-6">
                <div className="w-[62%]">
                    {leftColumn}
                </div>
                <div className="w-[38%] space-y-4">
                    {rightColumn}
                </div>
            </div>
        </div>
    );
}

export default CreativeTemplate;
