import React from 'react'
import { useTranslation } from 'react-i18next';

function ResumeEducation({ 
    data, 
    themeColor, 
    classes = {} 
}) {
    const { t } = useTranslation();

    if (!data || data.length === 0) return null;

    const {
        wrapper = "",
        title: titleClass = "",
        list = "space-y-2",
        item = "",
        header = "flex justify-between items-baseline",
        degree = "font-bold text-sm text-gray-800",
        institution = "text-xs text-gray-500 italic",
        date = "text-[10px] text-gray-500",
        meta = "text-[10px] text-gray-400"
    } = classes;

    return (
        <div className={wrapper}>
            <h3 
                className={titleClass} 
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
                {t('resume.sections.education')}
            </h3>
            <div className={list}>
                {data.map((edu, index) => (
                    <div key={index} className={item}>
                        <div className={header}>
                            <h4 className={degree}>
                                {edu?.degree} {edu?.major && `in ${edu.major}`}
                            </h4>
                            <span className={date}>
                                {edu?.startDate} — {edu?.endDate}
                            </span>
                        </div>
                        <p className={institution}>{edu?.universityName}</p>
                        {edu?.gpa && (
                            <p className={meta}>GPA: {edu.gpa}</p>
                        )}
                        {edu?.description && (
                             <p className={meta}>{edu.description}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeEducation