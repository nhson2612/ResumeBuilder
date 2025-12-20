import React from 'react'
import { useTranslation } from 'react-i18next';

// Minimal Template - Ultra-clean design with perfect whitespace and modern typography
function MinimalTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#18181b';
    const accentColor = resumeInfo?.accentColor || '#71717a';

    const renderBullets = (text) => {
        if (!text) return null;
        if (text.includes('<li>')) {
            return <div className="prose-minimal mt-1.5" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="mt-2 space-y-1">
                    {lines.map((line, i) => (
                        <li key={i} className="text-[11px] text-gray-500 leading-relaxed pl-3 relative">
                            <span
                                className="absolute left-0 top-[7px] w-1 h-1 rounded-full"
                                style={{ backgroundColor: accentColor }}
                            />
                            {line.replace(/^[-•*]\s*/, '')}
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">{text}</p>;
    };

    return (
        <div
            className='bg-white h-full px-10 py-10'
            style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
        >
            {/* Ultra-minimal Header */}
            <div className='mb-8'>
                <h1 className='text-4xl font-extralight tracking-tight' style={{ color: themeColor }}>
                    {resumeInfo?.firstName}{' '}
                    <span className='font-semibold'>{resumeInfo?.lastName}</span>
                </h1>

                <div className='flex items-center flex-wrap gap-x-3 gap-y-1 mt-3'>
                    <span className="text-sm font-medium" style={{ color: accentColor }}>
                        {resumeInfo?.jobTitle}
                    </span>

                    {resumeInfo?.email && (
                        <>
                            <span className='w-1 h-1 rounded-full' style={{ backgroundColor: accentColor }} />
                            <span className='text-xs text-gray-400'>{resumeInfo.email}</span>
                        </>
                    )}
                    {resumeInfo?.phone && (
                        <>
                            <span className='w-1 h-1 rounded-full' style={{ backgroundColor: accentColor }} />
                            <span className='text-xs text-gray-400'>{resumeInfo.phone}</span>
                        </>
                    )}
                    {resumeInfo?.address && (
                        <>
                            <span className='w-1 h-1 rounded-full' style={{ backgroundColor: accentColor }} />
                            <span className='text-xs text-gray-400'>{resumeInfo.address}</span>
                        </>
                    )}
                </div>

                {/* Subtle divider */}
                <div className='mt-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent' />
            </div>

            {/* Summary */}
            {resumeInfo?.summary && (
                <div className='mb-8'>
                    <p className='text-xs text-gray-500 leading-relaxed max-w-2xl'>
                        {resumeInfo.summary}
                    </p>
                </div>
            )}

            {/* Experience */}
            {resumeInfo?.Experience?.length > 0 && (
                <div className='mb-8'>
                    <h3
                        className='text-[10px] font-bold uppercase tracking-[0.2em] mb-4'
                        style={{ color: accentColor }}
                    >
                        {t('resume.sections.experience')}
                    </h3>
                    <div className='space-y-5'>
                        {resumeInfo.Experience.map((exp, index) => (
                            <div key={index} className='grid grid-cols-[100px_1fr] gap-4'>
                                <div className='text-right'>
                                    <p className='text-[10px] text-gray-400 leading-tight'>
                                        {exp?.startDate}
                                    </p>
                                    <p className='text-[10px] text-gray-400'>
                                        {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className='font-semibold text-sm leading-tight'
                                        style={{ color: themeColor }}
                                    >
                                        {exp?.title}
                                    </h4>
                                    <p className='text-xs text-gray-400 mt-0.5'>
                                        {exp?.companyName}
                                        {exp?.city && ` · ${exp.city}`}
                                    </p>
                                    {renderBullets(exp?.workSummery)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
                <div className='mb-8'>
                    <h3
                        className='text-[10px] font-bold uppercase tracking-[0.2em] mb-4'
                        style={{ color: accentColor }}
                    >
                        {t('resume.sections.education')}
                    </h3>
                    <div className='space-y-4'>
                        {resumeInfo.education.map((edu, index) => (
                            <div key={index} className='grid grid-cols-[100px_1fr] gap-4'>
                                <div className='text-right'>
                                    <p className='text-[10px] text-gray-400 leading-tight'>
                                        {edu?.startDate}
                                    </p>
                                    <p className='text-[10px] text-gray-400'>
                                        {edu?.endDate}
                                    </p>
                                </div>
                                <div>
                                    <h4
                                        className='font-semibold text-sm leading-tight'
                                        style={{ color: themeColor }}
                                    >
                                        {edu?.degree} {edu?.major && `in ${edu.major}`}
                                    </h4>
                                    <p className='text-xs text-gray-400 mt-0.5'>{edu?.universityName}</p>
                                    {edu?.gpa && (
                                        <p className='text-[10px] text-gray-400 mt-0.5'>GPA: {edu.gpa}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && (
                <div className='mb-8'>
                    <h3
                        className='text-[10px] font-bold uppercase tracking-[0.2em] mb-3'
                        style={{ color: accentColor }}
                    >
                        {t('resume.sections.skills')}
                    </h3>
                    <p className='text-xs text-gray-500 leading-relaxed'>
                        {resumeInfo.skills.map(skill => skill?.name).join('  ·  ')}
                    </p>
                </div>
            )}

            {/* Projects */}
            {resumeInfo?.Projects?.length > 0 && (
                <div className='mb-8'>
                    <h3
                        className='text-[10px] font-bold uppercase tracking-[0.2em] mb-4'
                        style={{ color: accentColor }}
                    >
                        {t('resume.sections.projects')}
                    </h3>
                    <div className='space-y-4'>
                        {resumeInfo.Projects.map((proj, index) => (
                            <div key={index}>
                                <div className="flex items-baseline gap-3">
                                    <h4
                                        className='font-semibold text-sm'
                                        style={{ color: themeColor }}
                                    >
                                        {proj?.projectName}
                                    </h4>
                                    {proj?.techStack && (
                                        <span className='text-[10px] text-gray-400'>
                                            {proj.techStack}
                                        </span>
                                    )}
                                </div>
                                {renderBullets(proj?.description)}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications & Languages - Inline */}
            <div className="flex gap-10">
                {resumeInfo?.Certifications?.length > 0 && (
                    <div className="flex-1">
                        <h3
                            className='text-[10px] font-bold uppercase tracking-[0.2em] mb-3'
                            style={{ color: accentColor }}
                        >
                            {t('resume.sections.certifications')}
                        </h3>
                        <div className="space-y-1">
                            {resumeInfo.Certifications.map((cert, index) => (
                                <p key={index} className='text-xs text-gray-500'>
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
                        <h3
                            className='text-[10px] font-bold uppercase tracking-[0.2em] mb-3'
                            style={{ color: accentColor }}
                        >
                            {t('resume.sections.languages')}
                        </h3>
                        <div className="space-y-1">
                            {resumeInfo.languages.map((lang, index) => (
                                <p key={index} className='text-xs'>
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
        </div>
    )
}

export default MinimalTemplate
