import React from 'react'
import RichTextDisplay from './RichTextDisplay'
import { useTranslation } from 'react-i18next';

function ResumeExperience({ 
    data, 
    themeColor, 
    classes = {} 
}) {
    const { t } = useTranslation();
    
    if (!data || data.length === 0) return null;

    const {
        wrapper = "",
        title: titleClass = "",
        list = "space-y-4",
        item = "",
        header = "flex justify-between items-baseline", // Default classic layout
        position = "font-bold text-sm text-gray-800",
        company = "text-xs text-gray-500 italic",
        date = "text-[10px] font-medium",
        description = "text-xs text-gray-600 leading-relaxed"
    } = classes;

    return (
        <div className={wrapper}>
            <h3 
                className={titleClass} 
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
                {t('resume.sections.experience')}
            </h3>
            <div className={list}>
                {data.map((exp, index) => (
                    <div key={index} className={item}>
                        <div className={header}>
                            <h4 className={position}>{exp?.title}</h4>
                            <span className={date} style={{ color: themeColor }}>
                                {exp?.startDate} — {exp?.currentlyWorking ? 'Present' : exp?.endDate}
                            </span>
                        </div>
                        <p className={company}>
                            {exp?.companyName}
                            {exp?.city && `, ${exp.city}`}
                            {exp?.state && `, ${exp.state}`}
                        </p>
                        <RichTextDisplay 
                            content={exp?.workSummery} 
                            className={description} 
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeExperience