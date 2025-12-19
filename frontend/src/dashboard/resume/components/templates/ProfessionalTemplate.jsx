import React from 'react'

import { useTranslation } from 'react-i18next';

// Professional Template - Corporate style with gradient header, bullet points, two-column body
function ProfessionalTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#1e40af';
    const fontFamily = resumeInfo?.fontFamily || 'Georgia, serif';

    // Parse bullet points from text
    const renderBullets = (text) => {
        if (!text) return null;
        if (text.includes('<li>')) {
            return <div className="prose-sm" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="space-y-0.5 mt-1">
                    {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <span style={{ color: themeColor }}>▸</span>
                            <span>{line.replace(/^[-•*]\s*/, '')}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-xs text-gray-600 mt-1">{text}</p>;
    };

    return (
        <div className='bg-white h-full' style={{ fontFamily }}>
            {/* Header with gradient */}
            <div
                className='px-6 py-5 text-white'
                style={{ background: `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}cc 50%, ${themeColor}99 100%)` }}
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className='text-2xl font-bold tracking-wide'>
                            {resumeInfo?.firstName} {resumeInfo?.lastName}
                        </h1>
                        <h2 className='text-sm font-light mt-0.5 opacity-90'>{resumeInfo?.jobTitle}</h2>
                    </div>
                    {/* Contact in header */}
                    <div className='text-right text-[11px] space-y-0.5 opacity-90'>
                        {resumeInfo?.email && <div>📧 {resumeInfo.email}</div>}
                        {resumeInfo?.phone && <div>📱 {resumeInfo.phone}</div>}
                        {(resumeInfo?.city || resumeInfo?.address) && (
                            <div>📍 {resumeInfo.address || resumeInfo.city}</div>
                        )}
                        {resumeInfo?.linkedIn && <div>💼 {resumeInfo.linkedIn}</div>}
                    </div>
                </div>
            </div>

            {/* Summary bar */}
            {resumeInfo?.summary && (
                <div className='px-6 py-3 bg-gray-50 border-b'>
                    <p className='text-xs text-gray-700 leading-relaxed italic'>
                        "{resumeInfo.summary}"
                    </p>
                </div>
            )}

            {/* Two-column body */}
            <div className='flex px-6 py-4 gap-5'>
                {/* Left Column - Main Content */}
                <div className='w-[65%]'>
                    {/* Experience */}
                    {resumeInfo?.Experience?.length > 0 && (
                        <div className='mb-5'>
                            <h3
                                className='text-xs font-bold uppercase tracking-widest pb-1.5 mb-3 border-b-2'
                                style={{ color: themeColor, borderColor: themeColor }}
                            >
                                💼 {t('resume.sections.experience')}
                            </h3>
                            <div className='space-y-4'>
                                {resumeInfo.Experience.map((exp, index) => (
                                    <div key={index} className='relative pl-4'>
                                        {/* Timeline dot */}
                                        <div
                                            className='absolute left-0 top-1.5 w-2 h-2 rounded-full'
                                            style={{ backgroundColor: themeColor }}
                                        />
                                        <div className='flex justify-between items-baseline'>
                                            <h4 className='font-bold text-sm text-gray-800'>{exp?.title}</h4>
                                            <span
                                                className='text-[10px] px-2 py-0.5 rounded text-white'
                                                style={{ backgroundColor: themeColor }}
                                            >
                                                {exp?.startDate} – {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                            </span>
                                        </div>
                                        <p className='text-xs text-gray-600 font-medium'>
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
                                className='text-xs font-bold uppercase tracking-widest pb-1.5 mb-3 border-b-2'
                                style={{ color: themeColor, borderColor: themeColor }}
                            >
                                🚀 {t('resume.sections.projects')}
                            </h3>
                            <div className='space-y-3'>
                                {resumeInfo.Projects.map((proj, index) => (
                                    <div key={index} className='relative pl-4'>
                                        <div
                                            className='absolute left-0 top-1.5 w-2 h-2 rounded-full'
                                            style={{ backgroundColor: themeColor }}
                                        />
                                        <h4 className='font-bold text-sm text-gray-800'>{proj?.projectName}</h4>
                                        {proj?.techStack && (
                                            <p className='text-[10px] text-gray-500'>
                                                <span className="font-medium">Tech:</span> {proj.techStack}
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
                                className='text-xs font-bold uppercase tracking-widest pb-1.5 mb-3 border-b-2'
                                style={{ color: themeColor, borderColor: themeColor }}
                            >
                                🎓 {t('resume.sections.education')}
                            </h3>
                            <div className='space-y-2'>
                                {resumeInfo.education.map((edu, index) => (
                                    <div key={index} className='relative pl-4'>
                                        <div
                                            className='absolute left-0 top-1.5 w-2 h-2 rounded-full'
                                            style={{ backgroundColor: themeColor }}
                                        />
                                        <div className='flex justify-between items-baseline'>
                                            <h4 className='font-bold text-sm text-gray-800'>
                                                {edu?.degree} {edu?.major && `– ${edu.major}`}
                                            </h4>
                                            <span className='text-[10px] text-gray-500'>
                                                {edu?.startDate} – {edu?.endDate}
                                            </span>
                                        </div>
                                        <p className='text-xs text-gray-600'>{edu?.universityName}</p>
                                        {edu?.gpa && (
                                            <p className='text-[10px] text-gray-500'>GPA: {edu.gpa}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Skills & Extras */}
                <div className='w-[35%]'>
                    {/* Skills */}
                    {resumeInfo?.skills?.length > 0 && (
                        <div
                            className='mb-4 p-3 rounded-lg'
                            style={{ backgroundColor: `${themeColor}08` }}
                        >
                            <h3
                                className='text-xs font-bold uppercase tracking-widest mb-2'
                                style={{ color: themeColor }}
                            >
                                🛠 {t('resume.sections.skills')}
                            </h3>
                            <div className='flex flex-wrap gap-1.5'>
                                {resumeInfo.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className='text-[10px] px-2 py-1 rounded-full text-white font-medium'
                                        style={{ backgroundColor: themeColor }}
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
                            className='mb-4 p-3 rounded-lg'
                            style={{ backgroundColor: `${themeColor}08` }}
                        >
                            <h3
                                className='text-xs font-bold uppercase tracking-widest mb-2'
                                style={{ color: themeColor }}
                            >
                                🌍 {t('resume.sections.languages')}
                            </h3>
                            <div className='space-y-1'>
                                {resumeInfo.languages.map((lang, index) => (
                                    <div key={index} className='flex justify-between text-xs'>
                                        <span className="font-medium text-gray-700">{lang?.language}</span>
                                        <span className='text-gray-500'>{lang?.proficiency}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Certifications */}
                    {resumeInfo?.Certifications?.length > 0 && (
                        <div
                            className='mb-4 p-3 rounded-lg'
                            style={{ backgroundColor: `${themeColor}08` }}
                        >
                            <h3
                                className='text-xs font-bold uppercase tracking-widest mb-2'
                                style={{ color: themeColor }}
                            >
                                🏆 {t('resume.sections.certifications')}
                            </h3>
                            <div className='space-y-2'>
                                {resumeInfo.Certifications.map((cert, index) => (
                                    <div key={index}>
                                        <p className='text-xs font-medium text-gray-800'>{cert?.certName}</p>
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
                            className='p-3 rounded-lg'
                            style={{ backgroundColor: `${themeColor}08` }}
                        >
                            <h3
                                className='text-xs font-bold uppercase tracking-widest mb-2'
                                style={{ color: themeColor }}
                            >
                                🏅 {t('resume.sections.awards')}
                            </h3>
                            <div className='space-y-1.5'>
                                {resumeInfo.awards.map((award, index) => (
                                    <div key={index}>
                                        <p className='text-xs font-medium text-gray-800'>{award?.title}</p>
                                        <p className='text-[10px] text-gray-500'>{award?.issuer}</p>
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
