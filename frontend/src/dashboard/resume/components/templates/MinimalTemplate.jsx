import React from 'react'

import { useTranslation } from 'react-i18next';

// Minimal Template - Clean, minimal design with lots of whitespace
function MinimalTemplate({ resumeInfo }) {
    const { t } = useTranslation();
    const themeColor = resumeInfo?.themeColor || '#374151';

    return (
        <div className='bg-white h-full p-10' style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
            {/* Header - Ultra minimal */}
            <div className='mb-8'>
                <h1 className='text-4xl font-light tracking-tight text-gray-900'>
                    {resumeInfo?.firstName} <span className='font-semibold'>{resumeInfo?.lastName}</span>
                </h1>
                <div className='flex items-center gap-3 mt-2 text-sm text-gray-500'>
                    <span>{resumeInfo?.jobTitle}</span>
                    <span className='w-1 h-1 rounded-full bg-gray-400'></span>
                    <span>{resumeInfo?.email}</span>
                    <span className='w-1 h-1 rounded-full bg-gray-400'></span>
                    <span>{resumeInfo?.phone}</span>
                </div>
            </div>

            {/* Summary */}
            {resumeInfo?.summary && (
                <div className='mb-8'>
                    <p className='text-sm text-gray-600 leading-relaxed max-w-2xl'>{resumeInfo?.summary}</p>
                </div>
            )}

            {/* Experience */}
            {resumeInfo?.Experience?.length > 0 && (
                <div className='mb-8'>
                    <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-4'>{t('resume.sections.experience')}</h3>
                    <div className='space-y-4'>
                        {resumeInfo?.Experience?.map((exp, index) => (
                            <div key={index} className='grid grid-cols-4 gap-4'>
                                <div className='col-span-1'>
                                    <p className='text-xs text-gray-400'>{exp?.startDate}</p>
                                    <p className='text-xs text-gray-400'>{exp?.currentlyWorking ? 'Present' : exp?.endDate}</p>
                                </div>
                                <div className='col-span-3'>
                                    <h4 className='font-medium text-sm text-gray-900'>{exp?.title}</h4>
                                    <p className='text-sm text-gray-500'>{exp?.companyName}</p>
                                    <div className='text-xs text-gray-500 mt-1' dangerouslySetInnerHTML={{ __html: exp?.workSummery }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Education */}
            {resumeInfo?.education?.length > 0 && (
                <div className='mb-8'>
                    <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-4'>{t('resume.sections.education')}</h3>
                    <div className='space-y-3'>
                        {resumeInfo?.education?.map((edu, index) => (
                            <div key={index} className='grid grid-cols-4 gap-4'>
                                <div className='col-span-1'>
                                    <p className='text-xs text-gray-400'>{edu?.startDate}</p>
                                    <p className='text-xs text-gray-400'>{edu?.endDate}</p>
                                </div>
                                <div className='col-span-3'>
                                    <h4 className='font-medium text-sm text-gray-900'>{edu?.degree} in {edu?.major}</h4>
                                    <p className='text-sm text-gray-500'>{edu?.universityName}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Skills - Simple inline */}
            {resumeInfo?.skills?.length > 0 && (
                <div className='mb-8'>
                    <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-3'>{t('resume.sections.skills')}</h3>
                    <p className='text-sm text-gray-600'>
                        {resumeInfo?.skills?.map(skill => skill?.name).join(' • ')}
                    </p>
                </div>
            )}

            {/* Projects */}
            {resumeInfo?.Projects?.length > 0 && (
                <div className='mb-8'>
                    <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-4'>{t('resume.sections.projects')}</h3>
                    <div className='space-y-3'>
                        {resumeInfo?.Projects?.map((proj, index) => (
                            <div key={index}>
                                <h4 className='font-medium text-sm text-gray-900'>{proj?.projectName}</h4>
                                <p className='text-xs text-gray-500'>{proj?.techStack}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Certifications */}
            {resumeInfo?.Certifications?.length > 0 && (
                <div>
                    <h3 className='text-xs font-bold uppercase tracking-widest text-gray-400 mb-3'>{t('resume.sections.certifications')}</h3>
                    <p className='text-sm text-gray-600'>
                        {resumeInfo?.Certifications?.map(cert => cert?.certName).join(' • ')}
                    </p>
                </div>
            )}
        </div>
    )
}

export default MinimalTemplate
