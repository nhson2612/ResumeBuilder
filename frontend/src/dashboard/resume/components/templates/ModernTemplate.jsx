import React from 'react'

import { useTranslation } from 'react-i18next';

// Modern Template - Two-column layout with sidebar, bullets, better typography
function ModernTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#6366f1';
    const fontFamily = resumeInfo?.fontFamily || 'Inter, system-ui, sans-serif';

    // Helper to render bullet points from HTML or plain text
    const renderBulletPoints = (text) => {
        if (!text) return null;
        // If already has HTML list, render as-is
        if (text.includes('<li>') || text.includes('<ul>')) {
            return <div className="prose-bullets" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        // Split by newlines and render as bullets
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="list-disc list-outside ml-4 space-y-0.5">
                    {lines.map((line, i) => (
                        <li key={i} className="text-xs text-gray-600">{line.replace(/^[-•*]\s*/, '')}</li>
                    ))}
                </ul>
            );
        }
        return <p className="text-xs text-gray-600">{text}</p>;
    };

    return (
        <div className='bg-white h-full flex' style={{ fontFamily }}>
            {/* Sidebar */}
            <div className='w-[35%] p-5 text-white' style={{ backgroundColor: themeColor }}>
                {/* Photo/Avatar */}
                <div className='w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-4 border-2 border-white/40'>
                    {resumeInfo?.photoUrl ? (
                        <img src={resumeInfo.photoUrl} alt="" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span className='text-2xl font-bold'>
                            {resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}
                        </span>
                    )}
                </div>

                {/* Contact */}
                <div className='mb-5'>
                    <h3 className='text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1.5 mb-3'>
                        📬 {t('resume.sections.personal')}
                    </h3>
                    <div className='space-y-2'>
                        {resumeInfo?.email && (
                            <div className='flex items-start gap-2 text-[11px]'>
                                <span className="opacity-70">✉</span>
                                <span className='break-all'>{resumeInfo.email}</span>
                            </div>
                        )}
                        {resumeInfo?.phone && (
                            <div className='flex items-start gap-2 text-[11px]'>
                                <span className="opacity-70">📱</span>
                                <span>{resumeInfo.phone}</span>
                            </div>
                        )}
                        {(resumeInfo?.address || resumeInfo?.city) && (
                            <div className='flex items-start gap-2 text-[11px]'>
                                <span className="opacity-70">📍</span>
                                <span>{resumeInfo.address}{resumeInfo.city && `, ${resumeInfo.city}`}</span>
                            </div>
                        )}
                        {resumeInfo?.linkedIn && (
                            <div className='flex items-start gap-2 text-[11px]'>
                                <span className="opacity-70">💼</span>
                                <span className="break-all">{resumeInfo.linkedIn}</span>
                            </div>
                        )}
                        {resumeInfo?.github && (
                            <div className='flex items-start gap-2 text-[11px]'>
                                <span className="opacity-70">💻</span>
                                <span className="break-all">{resumeInfo.github}</span>
                            </div>
                        )}
                        {resumeInfo?.website && (
                            <div className='flex items-start gap-2 text-[11px]'>
                                <span className="opacity-70">🌐</span>
                                <span className="break-all">{resumeInfo.website}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Skills with categories */}
                {resumeInfo?.skills?.length > 0 && (
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1.5 mb-3'>
                            🛠 {t('resume.sections.skills')}
                        </h3>
                        <div className='space-y-2'>
                            {resumeInfo.skills.map((skill, index) => (
                                <div key={index}>
                                    <div className='flex justify-between text-[11px] mb-0.5'>
                                        <span className="font-medium">{skill?.name}</span>
                                    </div>
                                    <div className='w-full bg-white/20 rounded-full h-1.5'>
                                        <div
                                            className='bg-white rounded-full h-1.5 transition-all'
                                            style={{ width: `${(skill?.rating || 3) * 20}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Languages */}
                {resumeInfo?.languages?.length > 0 && (
                    <div className='mb-5'>
                        <h3 className='text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1.5 mb-3'>
                            🌍 {t('resume.sections.languages')}
                        </h3>
                        <div className='space-y-1'>
                            {resumeInfo.languages.map((lang, index) => (
                                <div key={index} className='flex justify-between text-[11px]'>
                                    <span>{lang?.language}</span>
                                    <span className='opacity-75'>{lang?.proficiency}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeInfo?.Certifications?.length > 0 && (
                    <div>
                        <h3 className='text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1.5 mb-3'>
                            🏆 {t('resume.sections.certifications')}
                        </h3>
                        <div className='space-y-2'>
                            {resumeInfo.Certifications.map((cert, index) => (
                                <div key={index} className="text-[11px]">
                                    <p className='font-semibold'>{cert?.certName}</p>
                                    <p className='opacity-75'>{cert?.issuer} • {cert?.issueDate}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className='w-[65%] p-5'>
                {/* Header */}
                <div className='mb-4 pb-3 border-b-2' style={{ borderColor: themeColor }}>
                    <h1 className='text-2xl font-bold text-gray-800 tracking-tight'>
                        {resumeInfo?.firstName} {resumeInfo?.lastName}
                    </h1>
                    <h2 className='text-base font-semibold mt-0.5' style={{ color: themeColor }}>
                        {resumeInfo?.jobTitle}
                    </h2>
                </div>

                {/* Summary/Objective */}
                {(resumeInfo?.summary || resumeInfo?.objective) && (
                    <div className='mb-4'>
                        <h3 className='text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5' style={{ color: themeColor }}>
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: themeColor }}></span>
                            {t('resume.sections.summary')}
                        </h3>
                        <p className='text-xs text-gray-600 leading-relaxed'>
                            {resumeInfo?.summary || resumeInfo?.objective}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {resumeInfo?.Experience?.length > 0 && (
                    <div className='mb-4'>
                        <h3 className='text-xs font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5' style={{ color: themeColor }}>
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: themeColor }}></span>
                            {t('resume.sections.experience')}
                        </h3>
                        <div className='space-y-3'>
                            {resumeInfo.Experience.map((exp, index) => (
                                <div key={index} className='pl-3 border-l-2' style={{ borderColor: themeColor }}>
                                    <div className='flex justify-between items-baseline'>
                                        <h4 className='font-semibold text-sm text-gray-800'>{exp?.title}</h4>
                                        <span className='text-[10px] text-gray-500'>
                                            {exp?.startDate} – {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500 font-medium'>
                                        {exp?.companyName}{exp?.city && ` • ${exp?.city}`}
                                    </p>
                                    <div className='mt-1.5'>
                                        {renderBulletPoints(exp?.workSummery)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeInfo?.education?.length > 0 && (
                    <div className='mb-4'>
                        <h3 className='text-xs font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5' style={{ color: themeColor }}>
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: themeColor }}></span>
                            {t('resume.sections.education')}
                        </h3>
                        <div className='space-y-2'>
                            {resumeInfo.education.map((edu, index) => (
                                <div key={index} className='pl-3 border-l-2' style={{ borderColor: themeColor }}>
                                    <div className='flex justify-between items-baseline'>
                                        <h4 className='font-semibold text-sm text-gray-800'>
                                            {edu?.degree} {edu?.major && `in ${edu.major}`}
                                        </h4>
                                        <span className='text-[10px] text-gray-500'>
                                            {edu?.startDate} – {edu?.endDate}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500'>{edu?.universityName}</p>
                                    {edu?.gpa && <p className='text-[10px] text-gray-400'>GPA: {edu.gpa}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {resumeInfo?.Projects?.length > 0 && (
                    <div className='mb-4'>
                        <h3 className='text-xs font-bold uppercase tracking-widest mb-2.5 flex items-center gap-1.5' style={{ color: themeColor }}>
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: themeColor }}></span>
                            {t('resume.sections.projects')}
                        </h3>
                        <div className='space-y-2'>
                            {resumeInfo.Projects.map((proj, index) => (
                                <div key={index} className='pl-3 border-l-2' style={{ borderColor: themeColor }}>
                                    <h4 className='font-semibold text-sm text-gray-800'>{proj?.projectName}</h4>
                                    {proj?.techStack && (
                                        <p className='text-[10px] text-gray-500 italic'>{proj.techStack}</p>
                                    )}
                                    {proj?.description && (
                                        <div className='mt-1'>
                                            {renderBulletPoints(proj.description)}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards */}
                {resumeInfo?.awards?.length > 0 && (
                    <div>
                        <h3 className='text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5' style={{ color: themeColor }}>
                            <span className="w-4 h-0.5 rounded" style={{ backgroundColor: themeColor }}></span>
                            {t('resume.sections.awards')}
                        </h3>
                        <ul className='list-disc list-outside ml-4 space-y-0.5'>
                            {resumeInfo.awards.map((award, index) => (
                                <li key={index} className='text-xs text-gray-600'>
                                    <span className="font-medium">{award?.title}</span>
                                    {award?.issuer && ` – ${award.issuer}`}
                                    {award?.date && ` (${award.date})`}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ModernTemplate
