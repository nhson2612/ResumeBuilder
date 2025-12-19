import React from 'react'

import { useTranslation } from 'react-i18next';

// Classic Template - Traditional single column layout
function ClassicTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#2563eb';

    return (
        <div className='bg-white h-full p-8' style={{ fontFamily: 'Georgia, serif' }}>
            {/* Header */}
            <div className='text-center border-b-2 pb-4 mb-4' style={{ borderColor: themeColor }}>
                <h1 className='text-3xl font-bold tracking-wide' style={{ color: themeColor }}>
                    {resumeInfo?.firstName} {resumeInfo?.lastName}
                </h1>
                <h2 className='text-lg mt-1 text-gray-600'>{resumeInfo?.jobTitle}</h2>
                <div className='flex justify-center gap-4 mt-2 text-sm text-gray-500'>
                    {resumeInfo?.phone && <span>📞 {resumeInfo?.phone}</span>}
                    {resumeInfo?.email && <span>✉️ {resumeInfo?.email}</span>}
                    {resumeInfo?.address && <span>📍 {resumeInfo?.address}</span>}
                </div>
            </div>

            {/* Summary */}
            {resumeInfo?.summary && (
                <div className='mb-4'>
                    <h3 className='text-lg font-bold border-b pb-1 mb-2' style={{ color: themeColor, borderColor: themeColor }}>
                        {t('resume.sections.summary')}
                    </h3>
                    <p className='text-sm text-gray-700 leading-relaxed'>{resumeInfo?.summary}</p>
                </div>
            )}

            {/* Experience */}
            {resumeInfo?.Experience?.length > 0 && (
                <div className='mb-4'>
                    <h3 className='text-lg font-bold border-b pb-1 mb-2' style={{ color: themeColor, borderColor: themeColor }}>
                        {t('resume.sections.experience')}
                    </h3>
                    {resumeInfo?.Experience?.map((exp, index) => (
                        <div key={index} className='mb-3'>
                            <div className='flex justify-between items-baseline'>
                                <h4 className='font-semibold text-gray-800'>{exp?.title}</h4>
                                <span className='text-xs text-gray-500'>
                                    {exp?.startDate} - {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                                </span>
                            </div>
                            <p className='text-sm text-gray-600 italic'>{exp?.companyName} | {exp?.city}, {exp?.state}</p>
                            <div className='text-xs text-gray-600 mt-1' dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
                        </div>
                    ))}
                </div>
            )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
                <div className='mb-4'>
                    <h3 className='text-lg font-bold border-b pb-1 mb-2' style={{ color: themeColor, borderColor: themeColor }}>
                        {t('resume.sections.education')}
                    </h3>
                    {resumeInfo?.education?.map((edu, index) => (
                        <div key={index} className='mb-2'>
                            <div className='flex justify-between'>
                                <h4 className='font-semibold text-gray-800'>{edu?.degree} in {edu?.major}</h4>
                                <span className='text-xs text-gray-500'>{edu?.startDate} - {edu?.endDate}</span>
                            </div>
                            <p className='text-sm text-gray-600'>{edu?.universityName}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Skills */}
            {resumeInfo?.skills?.length > 0 && (
                <div className='mb-4'>
                    <h3 className='text-lg font-bold border-b pb-1 mb-2' style={{ color: themeColor, borderColor: themeColor }}>
                        {t('resume.sections.skills')}
                    </h3>
                    <div className='flex flex-wrap gap-2'>
                        {resumeInfo?.skills?.map((skill, index) => (
                            <span key={index} className='px-3 py-1 text-xs rounded-full text-white' style={{ backgroundColor: themeColor }}>
                                {skill?.name}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            {resumeInfo?.Projects?.length > 0 && (
                <div className='mb-4'>
                    <h3 className='text-lg font-bold border-b pb-1 mb-2' style={{ color: themeColor, borderColor: themeColor }}>
                        {t('resume.sections.projects')}
                    </h3>
                    {resumeInfo?.Projects?.map((proj, index) => (
                        <div key={index} className='mb-2'>
                            <h4 className='font-semibold text-gray-800'>{proj?.projectName}</h4>
                            <p className='text-xs text-gray-500'>{proj?.techStack}</p>
                            <div className='text-xs text-gray-600 mt-1' dangerouslySetInnerHTML={{ __html: proj?.description }} />
                        </div>
                    ))}
                </div>
            )}

            {/* Certifications */}
            {resumeInfo?.Certifications?.length > 0 && (
                <div className='mb-4'>
                    <h3 className='text-lg font-bold border-b pb-1 mb-2' style={{ color: themeColor, borderColor: themeColor }}>
                        {t('resume.sections.certifications')}
                    </h3>
                    {resumeInfo?.Certifications?.map((cert, index) => (
                        <div key={index} className='mb-1'>
                            <span className='font-semibold text-sm text-gray-800'>{cert?.certName}</span>
                            <span className='text-xs text-gray-500'> - {cert?.issuer} ({cert?.issueDate})</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ClassicTemplate
