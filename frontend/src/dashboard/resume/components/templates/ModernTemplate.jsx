import React from 'react'
import { useTranslation } from 'react-i18next';

// Modern Template - Two-column layout with sidebar, refined typography, and professional icons
function ModernTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#4f46e5';
    const fontFamily = resumeInfo?.fontFamily || "'Inter', system-ui, sans-serif";

    const renderBulletPoints = (text) => {
        if (!text) return null;
        if (text.includes('<li>') || text.includes('<ul>')) {
            return <div className="prose-modern mt-1.5" dangerouslySetInnerHTML={{ __html: text }} />;
        }
        const lines = text.split('\n').filter(l => l.trim());
        if (lines.length > 1) {
            return (
                <ul className="mt-2 space-y-1">
                    {lines.map((line, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-gray-600 leading-relaxed">
                            <span
                                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60"
                                style={{ backgroundColor: themeColor }}
                            />
                            <span>{line.replace(/^[-•*]\s*/, '')}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-[11px] text-gray-600 mt-1">{text}</p>;
    };

    return (
        <div className='bg-white h-full flex' style={{ fontFamily }}>
            {/* Sidebar */}
            <div
                className='w-[34%] p-5 text-white relative overflow-hidden'
                style={{ backgroundColor: themeColor }}
            >
                {/* Decorative gradient overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: `linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)`
                    }}
                />

                <div className="relative z-10">
                    {/* Photo/Avatar */}
                    <div className='w-20 h-20 mx-auto rounded-2xl bg-white/20 flex items-center justify-center mb-5 border-2 border-white/30 backdrop-blur-sm shadow-lg'>
                        {resumeInfo?.photoUrl ? (
                            <img src={resumeInfo.photoUrl} alt="" className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                            <span className='text-2xl font-bold'>
                                {resumeInfo?.firstName?.[0]}{resumeInfo?.lastName?.[0]}
                            </span>
                        )}
                    </div>

                    {/* Contact */}
                    <div className='mb-6'>
                        <h3 className='text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2'>
                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {t('resume.sections.personal')}
                        </h3>
                        <div className='space-y-2.5'>
                            {resumeInfo?.email && (
                                <div className='flex items-start gap-2.5 text-[10px]'>
                                    <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className='break-all leading-relaxed'>{resumeInfo.email}</span>
                                </div>
                            )}
                            {resumeInfo?.phone && (
                                <div className='flex items-start gap-2.5 text-[10px]'>
                                    <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <span>{resumeInfo.phone}</span>
                                </div>
                            )}
                            {(resumeInfo?.address || resumeInfo?.city) && (
                                <div className='flex items-start gap-2.5 text-[10px]'>
                                    <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                    <span>{resumeInfo.address}{resumeInfo.city && `, ${resumeInfo.city}`}</span>
                                </div>
                            )}
                            {resumeInfo?.linkedIn && (
                                <div className='flex items-start gap-2.5 text-[10px]'>
                                    <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="break-all">{resumeInfo.linkedIn}</span>
                                </div>
                            )}
                            {resumeInfo?.github && (
                                <div className='flex items-start gap-2.5 text-[10px]'>
                                    <svg className="w-3.5 h-3.5 opacity-70 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="break-all">{resumeInfo.github}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills with visual rating */}
                    {resumeInfo?.skills?.length > 0 && (
                        <div className='mb-6'>
                            <h3 className='text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2'>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.skills')}
                            </h3>
                            <div className='space-y-2.5'>
                                {resumeInfo.skills.map((skill, index) => (
                                    <div key={index}>
                                        <div className='flex justify-between text-[10px] mb-1'>
                                            <span className="font-medium">{skill?.name}</span>
                                        </div>
                                        <div className='w-full bg-white/15 rounded-full h-1.5 overflow-hidden'>
                                            <div
                                                className='bg-white/80 rounded-full h-1.5 transition-all duration-500'
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
                        <div className='mb-6'>
                            <h3 className='text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2'>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.languages')}
                            </h3>
                            <div className='space-y-1.5'>
                                {resumeInfo.languages.map((lang, index) => (
                                    <div key={index} className='flex justify-between text-[10px]'>
                                        <span className="font-medium">{lang?.language}</span>
                                        <span className='opacity-70 text-[9px] bg-white/15 px-2 py-0.5 rounded-full'>
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
                            <h3 className='text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-3 flex items-center gap-2'>
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                {t('resume.sections.certifications')}
                            </h3>
                            <div className='space-y-2.5'>
                                {resumeInfo.Certifications.map((cert, index) => (
                                    <div key={index} className="text-[10px]">
                                        <p className='font-semibold leading-tight'>{cert?.certName}</p>
                                        <p className='opacity-70 text-[9px]'>
                                            {cert?.issuer} {cert?.issueDate && `• ${cert.issueDate}`}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className='w-[66%] p-6'>
                {/* Header */}
                <div className='mb-5 pb-4 border-b-2' style={{ borderColor: themeColor }}>
                    <h1 className='text-2xl font-bold text-gray-800 tracking-tight'>
                        {resumeInfo?.firstName} {resumeInfo?.lastName}
                    </h1>
                    <h2
                        className='text-sm font-semibold mt-1 tracking-wide'
                        style={{ color: themeColor }}
                    >
                        {resumeInfo?.jobTitle}
                    </h2>
                </div>

                {/* Summary */}
                {(resumeInfo?.summary || resumeInfo?.objective) && (
                    <div className='mb-5'>
                        <h3
                            className='text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2'
                            style={{ color: themeColor }}
                        >
                            <span
                                className="w-4 h-0.5 rounded"
                                style={{ backgroundColor: themeColor }}
                            />
                            {t('resume.sections.summary')}
                        </h3>
                        <p className='text-xs text-gray-600 leading-relaxed'>
                            {resumeInfo?.summary || resumeInfo?.objective}
                        </p>
                    </div>
                )}

                {/* Experience */}
                {resumeInfo?.Experience?.length > 0 && (
                    <div className='mb-5'>
                        <h3
                            className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                            style={{ color: themeColor }}
                        >
                            <span
                                className="w-4 h-0.5 rounded"
                                style={{ backgroundColor: themeColor }}
                            />
                            {t('resume.sections.experience')}
                        </h3>
                        <div className='space-y-4'>
                            {resumeInfo.Experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className='pl-3 border-l-2'
                                    style={{ borderColor: `${themeColor}40` }}
                                >
                                    <div className='flex justify-between items-baseline'>
                                        <h4 className='font-semibold text-sm text-gray-800'>{exp?.title}</h4>
                                        <span
                                            className='text-[9px] px-2 py-0.5 rounded-full font-medium'
                                            style={{
                                                backgroundColor: `${themeColor}15`,
                                                color: themeColor
                                            }}
                                        >
                                            {exp?.startDate} – {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-500 font-medium'>
                                        {exp?.companyName}{exp?.city && ` • ${exp?.city}`}
                                    </p>
                                    {renderBulletPoints(exp?.workSummery)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {resumeInfo?.education?.length > 0 && (
                    <div className='mb-5'>
                        <h3
                            className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                            style={{ color: themeColor }}
                        >
                            <span
                                className="w-4 h-0.5 rounded"
                                style={{ backgroundColor: themeColor }}
                            />
                            {t('resume.sections.education')}
                        </h3>
                        <div className='space-y-3'>
                            {resumeInfo.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className='pl-3 border-l-2'
                                    style={{ borderColor: `${themeColor}40` }}
                                >
                                    <div className='flex justify-between items-baseline'>
                                        <h4 className='font-semibold text-sm text-gray-800'>
                                            {edu?.degree} {edu?.major && `in ${edu.major}`}
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

                {/* Projects */}
                {resumeInfo?.Projects?.length > 0 && (
                    <div className='mb-5'>
                        <h3
                            className='text-[10px] font-bold uppercase tracking-widest mb-3 flex items-center gap-2'
                            style={{ color: themeColor }}
                        >
                            <span
                                className="w-4 h-0.5 rounded"
                                style={{ backgroundColor: themeColor }}
                            />
                            {t('resume.sections.projects')}
                        </h3>
                        <div className='space-y-3'>
                            {resumeInfo.Projects.map((proj, index) => (
                                <div
                                    key={index}
                                    className='pl-3 border-l-2'
                                    style={{ borderColor: `${themeColor}40` }}
                                >
                                    <h4 className='font-semibold text-sm text-gray-800'>{proj?.projectName}</h4>
                                    {proj?.techStack && (
                                        <p className='text-[9px] text-gray-500 italic'>{proj.techStack}</p>
                                    )}
                                    {renderBulletPoints(proj?.description)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Awards */}
                {resumeInfo?.awards?.length > 0 && (
                    <div>
                        <h3
                            className='text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2'
                            style={{ color: themeColor }}
                        >
                            <span
                                className="w-4 h-0.5 rounded"
                                style={{ backgroundColor: themeColor }}
                            />
                            {t('resume.sections.awards')}
                        </h3>
                        <ul className='space-y-1'>
                            {resumeInfo.awards.map((award, index) => (
                                <li key={index} className='text-xs text-gray-600'>
                                    <span className="font-medium text-gray-800">{award?.title}</span>
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
