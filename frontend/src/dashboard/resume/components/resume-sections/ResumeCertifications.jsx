import React from 'react'
import { useTranslation } from 'react-i18next';

function ResumeCertifications({ 
    data, 
    themeColor, 
    classes = {} 
}) {
    const { t } = useTranslation();

    if (!data || data.length === 0) return null;

    const {
        wrapper = "",
        title: titleClass = "",
        list = "space-y-1.5",
        item = "flex justify-between items-baseline",
        name = "font-medium text-xs text-gray-800",
        issuer = "text-[10px] text-gray-500"
    } = classes;

    return (
        <div className={wrapper}>
            <h3 
                className={titleClass} 
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
                {t('resume.sections.certifications')}
            </h3>
            <div className={list}>
                {data.map((cert, index) => (
                    <div key={index} className={item}>
                        <span className={name}>{cert?.certName}</span>
                        <span className={issuer}>
                            {cert?.issuer} {cert?.issueDate && `• ${cert.issueDate}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ResumeCertifications