import React from 'react'
import { useTranslation } from 'react-i18next';

// Professional Template - Corporate style with gradient header, timeline design, and two-column body
function ProfessionalTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#0369a1';
    const secondaryColor = resumeInfo?.accentColor || '#0ea5e9';
    const fontFamily = resumeInfo?.fontFamily || "'Inter', Georgia, serif";

    const renderBullets = (text) => {
        if (!text) return null;
        if (text.includes('<li>')) {
            return <div className="prose-professional mt-1.5" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="mt-1.5 space-y-0.5">
                    {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600 leading-relaxed">
                            <svg
                                className="w-3 h-3 mt-0.5 flex-shrink-0"
                                style={{ color: themeColor }}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>{line.replace(/^[-•*]\s*/, '')}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{text}</p>;
    };

    return (
        <div className='bg-white h-full' style={{ fontFamily }}>
            {/* Header with gradient */}
            <div
                className='px-7 py-6 text-white relative overflow-hidden'
                style={{
                    background: `linear-gradient(135deg, ${themeColor} 0%, ${secondaryColor} 100%)`
                }}
            >
                {/* Decorative pattern */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}
                />

                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <h1 className='text-2xl font-bold tracking-wide'>
                            {resumeInfo?.firstName} {resumeInfo?.lastName}
                        </h1>
                        <h2 className='text-sm font-light mt-1 opacity-90 tracking-wide'>
                            {resumeInfo?.jobTitle}
                        </h2>
                    </div>

                    {/* Contact in header - card style */}
                    <div className='text-right text-[10px] space-y-1 bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-lg'>
                        {resumeInfo?.email && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{resumeInfo.email}</span>
                                <svg className="w-3 h-3 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                        )}
                        {resumeInfo?.phone && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{resumeInfo.phone}</span>
                                <svg className="w-3 h-3 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </div>
                        )}
                        {(resumeInfo?.city || resumeInfo?.address) && (
                            <div className="flex items-center justify-end gap-2">
                                <span>{resumeInfo.address || resumeInfo.city}</span>
                                <svg className="w-3 h-3 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                        {resumeInfo?.linkedIn && (
                            <div className="flex items-center justify-end gap-2">
                                <span className="max-w-[120px] truncate">LinkedIn</span>
                                <svg className="w-3 h-3 opacity-80" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                </svg>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary bar */}
            {resumeInfo?.summary && (
                <div
                    className='px-7 py-3 border-b'
                    style={{
                        backgroundColor: `${themeColor}08`,
                        borderColor: `${themeColor}15`
                    }}
                >
                    <p className='text-xs text-gray-600 leading-relaxed'>
                        {resumeInfo.summary}
                    </p>
                </div>
            )}

            {/* Two-column body */}
            <div className='flex px-7 py-5 gap-6'>
                {/* Left Column - Main Content */}
                <div className='w-[63%]'>
                    {/* Experience */}
                    {resumeInfo?.Experience?.length > 0 && (
                        <div className='mb-5'>
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest pb-2 mb-3 border-b-2 flex items-center gap-2'
                                style={{ color: themeColor, borderColor: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                </svg>
                                {t('resume.sections.experience')}
                            </h3>
                            <div className='space-y-4'>
                                {resumeInfo.Experience.map((exp, index) => (
                                    <div key={index} className='relative pl-5'>
                                        {/* Timeline */}
                                        <div
                                            className='absolute left-0 top-0 bottom-0 w-0.5'
                                            style={{ backgroundColor: `${themeColor}25` }}
                                        />
                                        <div
                                            className='absolute left-[-3px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white'
                                            style={{ borderColor: themeColor }}
                                        />

                                        <div className='flex justify-between items-baseline'>
                                            <h4 className='font-bold text-sm text-gray-800'>{exp?.title}</h4>
                                            <span
                                                className='text-[9px] px-2.5 py-1 rounded-full text-white font-medium'
                                                style={{
                                                    background: `linear-gradient(135deg, ${themeColor} 0%, ${secondaryColor} 100%)`
                                                }}
                                            >
                                                {exp?.startDate} – {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                            </span>
                                        </div>
                                        <p className='text-xs text-gray-500 font-medium'>
                                            {exp?.companyName}
                                            {exp?.city && `, ${exp.city}`}
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
                        <div className='mb-5'>
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest pb-2 mb-3 border-b-2 flex items-center gap-2'
                                style={{ color: themeColor, borderColor: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zm11-1a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.projects')}
                            </h3>
                            <div className='space-y-3'>
                                {resumeInfo.Projects.map((proj, index) => (
                                    <div key={index} className='relative pl-5'>
                                        <div
                                            className='absolute left-0 top-0 bottom-0 w-0.5'
                                            style={{ backgroundColor: `${themeColor}25` }}
                                        />
                                        <div
                                            className='absolute left-[-3px] top-1 w-2.5 h-2.5 rounded-full'
                                            style={{ backgroundColor: themeColor }}
                                        />
                                        <h4 className='font-bold text-sm text-gray-800'>{proj?.projectName}</h4>
                                        {proj?.techStack && (
                                            <p className='text-[10px] text-gray-500'>
                                                <span className="font-semibold" style={{ color: themeColor }}>Tech:</span> {proj.techStack}
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
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest pb-2 mb-3 border-b-2 flex items-center gap-2'
                                style={{ color: themeColor, borderColor: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0z" />
                                </svg>
                                {t('resume.sections.education')}
                            </h3>
                            <div className='space-y-3'>
                                {resumeInfo.education.map((edu, index) => (
                                    <div key={index} className='relative pl-5'>
                                        <div
                                            className='absolute left-0 top-0 bottom-0 w-0.5'
                                            style={{ backgroundColor: `${themeColor}25` }}
                                        />
                                        <div
                                            className='absolute left-[-3px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white'
                                            style={{ borderColor: themeColor }}
                                        />
                                        <div className='flex justify-between items-baseline'>
                                            <h4 className='font-bold text-sm text-gray-800'>
                                                {edu?.degree} {edu?.major && `– ${edu.major}`}
                                            </h4>
                                            <span className='text-[9px] text-gray-400'>
                                                {edu?.startDate} – {edu?.endDate}
                                            </span>
                                        </div>
                                        <p className='text-xs text-gray-500'>{edu?.universityName}</p>
                                        {edu?.gpa && (
                                            <p className='text-[10px] text-gray-400'>GPA: {edu.gpa}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Skills & Extras */}
                <div className='w-[37%] space-y-4'>
                    {/* Skills */}
                    {resumeInfo?.skills?.length > 0 && (
                        <div
                            className='p-4 rounded-xl'
                            style={{
                                background: `linear-gradient(135deg, ${themeColor}08 0%, ${secondaryColor}08 100%)`,
                                border: `1px solid ${themeColor}15`
                            }}
                        >
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                                style={{ color: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.skills')}
                            </h3>
                            <div className='flex flex-wrap gap-1.5'>
                                {resumeInfo.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className='text-[10px] px-2.5 py-1 rounded-full text-white font-medium'
                                        style={{
                                            background: `linear-gradient(135deg, ${themeColor} 0%, ${secondaryColor} 100%)`
                                        }}
                                    >
                                        {skill?.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {resumeInfo?.languages?.length > 0 && (
                        <div
                            className='p-4 rounded-xl'
                            style={{
                                backgroundColor: `${themeColor}05`,
                                border: `1px solid ${themeColor}15`
                            }}
                        >
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                                style={{ color: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.languages')}
                            </h3>
                            <div className='space-y-2'>
                                {resumeInfo.languages.map((lang, index) => (
                                    <div key={index} className='flex justify-between items-center'>
                                        <span className="text-xs font-medium text-gray-700">{lang?.language}</span>
                                        <span
                                            className='text-[9px] px-2 py-0.5 rounded-full'
                                            style={{
                                                backgroundColor: `${themeColor}15`,
                                                color: themeColor
                                            }}
                                        >
                                            {lang?.proficiency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {resumeInfo?.Certifications?.length > 0 && (
                        <div
                            className='p-4 rounded-xl'
                            style={{
                                backgroundColor: `${themeColor}05`,
                                border: `1px solid ${themeColor}15`
                            }}
                        >
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                                style={{ color: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.certifications')}
                            </h3>
                            <div className='space-y-2.5'>
                                {resumeInfo.Certifications.map((cert, index) => (
                                    <div key={index} className="border-l-2 pl-2.5" style={{ borderColor: themeColor }}>
                                        <p className='text-xs font-semibold text-gray-800'>{cert?.certName}</p>
                                        <p className='text-[10px] text-gray-500'>
                                            {cert?.issuer} {cert?.issueDate && `• ${cert.issueDate}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Awards */}
                    {resumeInfo?.awards?.length > 0 && (
                        <div
                            className='p-4 rounded-xl'
                            style={{
                                backgroundColor: `${themeColor}05`,
                                border: `1px solid ${themeColor}15`
                            }}
                        >
                            <h3
                                className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                                style={{ color: themeColor }}
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                {t('resume.sections.awards')}
                            </h3>
                            <div className='space-y-1.5'>
                                {resumeInfo.awards.map((award, index) => (
                                    <div key={index}>
                                        <p className='text-xs font-semibold text-gray-800'>{award?.title}</p>
                                        <p className='text-[10px] text-gray-500'>
                                            {award?.issuer} {award?.date && `• ${award.date}`}
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

export default ProfessionalTemplate
