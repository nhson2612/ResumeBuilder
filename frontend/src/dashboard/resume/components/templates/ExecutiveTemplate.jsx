import React from 'react'
import { useTranslation } from 'react-i18next';

// Executive Template - Premium corporate design with elegant typography
function ExecutiveTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#0f172a';
    const accentColor = resumeInfo?.accentColor || '#3b82f6';

    const renderBullets = (text) => {
        if (!text) return null;
        if (text.includes('<li>')) {
            return <div className="prose-executive" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="mt-2 space-y-1">
                    {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600 leading-relaxed">
                            <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: accentColor }}
                            />
                            <span>{line.replace(/^[-•*]\s*/, '')}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{text}</p>;
    };

    return (
        <div
            className="bg-white h-full"
            style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
        >
            {/* Elegant Header */}
            <div className="relative">
                {/* Gradient accent bar */}
                <div
                    className="h-2"
                    style={{
                        background: `linear-gradient(90deg, ${themeColor} 0%, ${accentColor} 50%, ${themeColor} 100%)`
                    }}
                />

                <div className="px-8 py-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-light tracking-tight" style={{ color: themeColor }}>
                                {resumeInfo?.firstName}{' '}
                                <span className="font-bold">{resumeInfo?.lastName}</span>
                            </h1>
                            <h2
                                className="text-sm font-medium mt-1 tracking-wide uppercase"
                                style={{ color: accentColor }}
                            >
                                {resumeInfo?.jobTitle}
                            </h2>
                        </div>

                        {/* Contact info - elegant card style */}
                        <div
                            className="text-right text-[10px] space-y-1 px-4 py-3 rounded-lg"
                            style={{ backgroundColor: `${themeColor}08` }}
                        >
                            {resumeInfo?.email && (
                                <div className="flex items-center justify-end gap-2 text-gray-600">
                                    <span>{resumeInfo.email}</span>
                                    <svg className="w-3 h-3" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                            )}
                            {resumeInfo?.phone && (
                                <div className="flex items-center justify-end gap-2 text-gray-600">
                                    <span>{resumeInfo.phone}</span>
                                    <svg className="w-3 h-3" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                </div>
                            )}
                            {(resumeInfo?.address || resumeInfo?.city) && (
                                <div className="flex items-center justify-end gap-2 text-gray-600">
                                    <span>{resumeInfo.address || resumeInfo.city}</span>
                                    <svg className="w-3 h-3" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                            {resumeInfo?.linkedIn && (
                                <div className="flex items-center justify-end gap-2 text-gray-600">
                                    <span className="truncate max-w-[150px]">{resumeInfo.linkedIn}</span>
                                    <svg className="w-3 h-3" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary with elegant quote style */}
            {resumeInfo?.summary && (
                <div className="px-8 py-4 border-y" style={{ borderColor: `${themeColor}15` }}>
                    <div className="flex gap-3">
                        <div
                            className="w-1 rounded-full flex-shrink-0"
                            style={{ backgroundColor: accentColor }}
                        />
                        <p className="text-xs text-gray-600 leading-relaxed italic">
                            {resumeInfo.summary}
                        </p>
                    </div>
                </div>
            )}

            {/* Main Content - Two Column */}
            <div className="flex px-8 py-5 gap-6">
                {/* Left Column - 65% */}
                <div className="w-[65%]">
                    {/* Experience */}
                    {resumeInfo?.Experience?.length > 0 && (
                        <div className="mb-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                    </svg>
                                </div>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.experience')}
                                </h3>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${themeColor}15` }} />
                            </div>

                            <div className="space-y-4">
                                {resumeInfo.Experience.map((exp, index) => (
                                    <div key={index} className="relative pl-4">
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                                            style={{ backgroundColor: `${accentColor}30` }}
                                        />
                                        <div
                                            className="absolute left-[-3px] top-1 w-2 h-2 rounded-full border-2 bg-white"
                                            style={{ borderColor: accentColor }}
                                        />
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-semibold text-sm" style={{ color: themeColor }}>
                                                {exp?.title}
                                            </h4>
                                            <span
                                                className="text-[9px] px-2 py-0.5 rounded-full font-medium"
                                                style={{
                                                    backgroundColor: `${accentColor}15`,
                                                    color: accentColor
                                                }}
                                            >
                                                {exp?.startDate} — {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                                            {exp?.companyName}
                                            {exp?.city && ` · ${exp.city}`}
                                            {exp?.state && `, ${exp.state}`}
                                        </p>
                                        {renderBullets(exp?.workSummery)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Projects */}
                    {resumeInfo?.Projects?.length > 0 && (
                        <div className="mb-5">
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zm11-1a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.projects')}
                                </h3>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${themeColor}15` }} />
                            </div>

                            <div className="space-y-3">
                                {resumeInfo.Projects.map((proj, index) => (
                                    <div key={index} className="relative pl-4">
                                        <div
                                            className="absolute left-0 top-0 bottom-0 w-0.5 rounded-full"
                                            style={{ backgroundColor: `${accentColor}30` }}
                                        />
                                        <h4 className="font-semibold text-sm" style={{ color: themeColor }}>
                                            {proj?.projectName}
                                        </h4>
                                        {proj?.techStack && (
                                            <p className="text-[10px] text-gray-400 mt-0.5">
                                                <span className="font-medium" style={{ color: accentColor }}>Tech:</span> {proj.techStack}
                                            </p>
                                        )}
                                        {renderBullets(proj?.description)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Education */}
                    {resumeInfo?.education?.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${accentColor}15` }}
                                >
                                    <svg className="w-3.5 h-3.5" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                                    </svg>
                                </div>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.education')}
                                </h3>
                                <div className="flex-1 h-px" style={{ backgroundColor: `${themeColor}15` }} />
                            </div>

                            <div className="space-y-2">
                                {resumeInfo.education.map((edu, index) => (
                                    <div key={index} className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-sm" style={{ color: themeColor }}>
                                                {edu?.degree} {edu?.major && `in ${edu.major}`}
                                            </h4>
                                            <p className="text-xs text-gray-500">{edu?.universityName}</p>
                                            {edu?.gpa && (
                                                <p className="text-[10px] text-gray-400">GPA: {edu.gpa}</p>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-gray-400">
                                            {edu?.startDate} — {edu?.endDate}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - 35% */}
                <div className="w-[35%] space-y-4">
                    {/* Skills */}
                    {resumeInfo?.skills?.length > 0 && (
                        <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${themeColor}05` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.skills')}
                                </h3>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {resumeInfo.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="text-[10px] px-2.5 py-1 rounded-full font-medium transition-all"
                                        style={{
                                            backgroundColor: `${accentColor}15`,
                                            color: accentColor,
                                            border: `1px solid ${accentColor}30`
                                        }}
                                    >
                                        {skill?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {resumeInfo?.Certifications?.length > 0 && (
                        <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${themeColor}05` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.certifications')}
                                </h3>
                            </div>
                            <div className="space-y-2">
                                {resumeInfo.Certifications.map((cert, index) => (
                                    <div key={index} className="border-l-2 pl-2" style={{ borderColor: accentColor }}>
                                        <p className="text-xs font-medium" style={{ color: themeColor }}>
                                            {cert?.certName}
                                        </p>
                                        <p className="text-[10px] text-gray-500">
                                            {cert?.issuer} {cert?.issueDate && `· ${cert.issueDate}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {resumeInfo?.languages?.length > 0 && (
                        <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${themeColor}05` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                                </svg>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.languages')}
                                </h3>
                            </div>
                            <div className="space-y-1.5">
                                {resumeInfo.languages.map((lang, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-xs font-medium" style={{ color: themeColor }}>
                                            {lang?.language}
                                        </span>
                                        <span
                                            className="text-[10px] px-2 py-0.5 rounded-full"
                                            style={{
                                                backgroundColor: `${accentColor}15`,
                                                color: accentColor
                                            }}
                                        >
                                            {lang?.proficiency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Awards */}
                    {resumeInfo?.awards?.length > 0 && (
                        <div
                            className="p-4 rounded-xl"
                            style={{ backgroundColor: `${themeColor}05` }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <svg className="w-4 h-4" style={{ color: accentColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <h3
                                    className="text-xs font-bold uppercase tracking-widest"
                                    style={{ color: themeColor }}
                                >
                                    {t('resume.sections.awards')}
                                </h3>
                            </div>
                            <div className="space-y-1.5">
                                {resumeInfo.awards.map((award, index) => (
                                    <div key={index}>
                                        <p className="text-xs font-medium" style={{ color: themeColor }}>
                                            {award?.title}
                                        </p>
                                        <p className="text-[10px] text-gray-500">
                                            {award?.issuer} {award?.date && `· ${award.date}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ExecutiveTemplate
