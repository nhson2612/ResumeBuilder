import React from 'react'
import RichTextDisplay from './RichTextDisplay'
import { useTranslation } from 'react-i18next';

function ResumeProjects({ 
    data, 
    themeColor, 
    classes = {} 
}) {
    const { t } = useTranslation();

    if (!data || data.length === 0) return null;

    const {
        wrapper = "",
        title: titleClass = "",
        list = "space-y-3",
        item = "",
        header = "",
        name = "font-bold text-sm text-gray-800",
        tech = "text-[10px] text-gray-500 italic",
        description = "text-xs text-gray-600 leading-relaxed"
    } = classes;

    return (
        <div className={wrapper}>
            <h3 
                className={titleClass} 
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
                {t('resume.sections.projects')}
            </h3>
            <div className={list}>
                {data.map((proj, index) => (
                    <div key={index} className={item}>
                        <h4 className={name}>{proj?.projectName}</h4>
                        {proj?.techStack && (
                            <p className={tech}>{proj.techStack}</p>
                        )}
                        <RichTextDisplay 
                            content={proj?.description} 
                            className={description} 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeProjects