import React from 'react'
import { useTranslation } from 'react-i18next';

// Classic Template - Elegant traditional design with refined typography
function ClassicTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#1e3a5f';

    const renderBullets = (text) => {
        if (!text) return null;
        if (text.includes('<li>')) {
            return <div className="prose-classic mt-1" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="mt-1.5 space-y-0.5">
                    {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600 leading-relaxed">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{line.replace(/^[-•*]\s*/, '')}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-[11px] text-gray-600 mt-1">{text}</p>;
    };

    return (
        <div
            className='bg-white h-full'
            style={{ fontFamily: "'Merriweather', 'Georgia', serif" }}
        >
            {/* Elegant Header with border accent */}
            <div
                className="border-b-4 px-8 pt-8 pb-5"
                style={{ borderColor: themeColor }}
            >
                <div className="text-center">
                    <h1
                        className='text-3xl font-bold tracking-wide uppercase'
                        style={{ color: themeColor, letterSpacing: '0.15em' }}
                    >
                        {resumeInfo?.firstName} {resumeInfo?.lastName}
                    </h1>
                    <h2 className='text-sm mt-2 text-gray-600 font-medium tracking-wide'>
                        {resumeInfo?.jobTitle}
                    </h2>

                    {/* Contact info with elegant separators */}
                    <div className='flex justify-center items-center flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-gray-500'>
                        {resumeInfo?.phone && (
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" style={{ color: themeColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                {resumeInfo.phone}
                            </span>
                        )}
                        {resumeInfo?.email && (
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" style={{ color: themeColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                {resumeInfo.email}
                            </span>
                        )}
                        {resumeInfo?.address && (
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" style={{ color: themeColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                {resumeInfo.address}
                            </span>
                        )}
                        {resumeInfo?.linkedIn && (
                            <span className="flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" style={{ color: themeColor }} fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                </svg>
                                LinkedIn
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-8 py-5 space-y-5">
                {/* Summary */}
                {resumeInfo?.summary && (
                    <div>
                        <h3
                            className='text-sm font-bold uppercase tracking-widest pb-1.5 mb-2 border-b'
                            style={{ color: themeColor, borderColor: `${themeColor}40` }}
                        >
                            {t('resume.sections.summary')}
                        </h3>
                        <p className='text-xs text-gray-600 leading-relaxed text-justify'>
                            {resumeInfo.summary}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {resumeInfo?.Experience?.length > 0 && (
                    <div>
                        <h3
                            className='text-sm font-bold uppercase tracking-widest pb-1.5 mb-3 border-b'
                            style={{ color: themeColor, borderColor: `${themeColor}40` }}
                        >
                            {t('resume.sections.experience')}
                        </h3>
                        <div className="space-y-4">
                            {resumeInfo.Experience.map((exp, index) => (
                                <div key={index}>
                                    <div className='flex justify-between items-baseline'>
                                        <h4 className='font-bold text-sm text-gray-800'>{exp?.title}</h4>
                                        <span
                                            className='text-[10px] font-medium'
                                            style={{ color: themeColor }}
                                        >
                                            {exp?.startDate} — {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500 italic'>
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

                {/* Education */}
                {resumeInfo?.education?.length > 0 && (
                    <div>
                        <h3
                            className='text-sm font-bold uppercase tracking-widest pb-1.5 mb-3 border-b'
                            style={{ color: themeColor, borderColor: `${themeColor}40` }}
                        >
                            {t('resume.sections.education')}
                        </h3>
                        <div className="space-y-2">
                            {resumeInfo.education.map((edu, index) => (
                                <div key={index}>
                                    <div className='flex justify-between items-baseline'>
                                        <h4 className='font-bold text-sm text-gray-800'>
                                            {edu?.degree} {edu?.major && `in ${edu.major}`}
                                        </h4>
                                        <span className='text-[10px] text-gray-500'>
                                            {edu?.startDate} — {edu?.endDate}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500 italic'>{edu?.universityName}</p>
                                    {edu?.gpa && (
                                        <p className="text-[10px] text-gray-400">GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {resumeInfo?.skills?.length > 0 && (
                    <div>
                        <h3
                            className='text-sm font-bold uppercase tracking-widest pb-1.5 mb-2 border-b'
                            style={{ color: themeColor, borderColor: `${themeColor}40` }}
                        >
                            {t('resume.sections.skills')}
                        </h3>
                        <div className='flex flex-wrap gap-2'>
                            {resumeInfo.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className='px-3 py-1 text-[10px] rounded border font-medium'
                                    style={{
                                        borderColor: themeColor,
                                        color: themeColor,
                                        backgroundColor: `${themeColor}08`
                                    }}
                                >
                                    {skill?.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resumeInfo?.Projects?.length > 0 && (
                    <div>
                        <h3
                            className='text-sm font-bold uppercase tracking-widest pb-1.5 mb-3 border-b'
                            style={{ color: themeColor, borderColor: `${themeColor}40` }}
                        >
                            {t('resume.sections.projects')}
                        </h3>
                        <div className="space-y-3">
                            {resumeInfo.Projects.map((proj, index) => (
                                <div key={index}>
                                    <h4 className='font-bold text-sm text-gray-800'>{proj?.projectName}</h4>
                                    {proj?.techStack && (
                                        <p className='text-[10px] text-gray-500 italic'>{proj.techStack}</p>
                                    )}
                                    {renderBullets(proj?.description)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeInfo?.Certifications?.length > 0 && (
                    <div>
                        <h3
                            className='text-sm font-bold uppercase tracking-widest pb-1.5 mb-2 border-b'
                            style={{ color: themeColor, borderColor: `${themeColor}40` }}
                        >
                            {t('resume.sections.certifications')}
                        </h3>
                        <div className="space-y-1.5">
                            {resumeInfo.Certifications.map((cert, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <span className='font-medium text-xs text-gray-800'>{cert?.certName}</span>
                                    <span className='text-[10px] text-gray-500'>
                                        {cert?.issuer} {cert?.issueDate && `• ${cert.issueDate}`}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClassicTemplate
