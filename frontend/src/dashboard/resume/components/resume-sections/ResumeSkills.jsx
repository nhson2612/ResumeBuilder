import React from 'react'
import { useTranslation } from 'react-i18next';

function ResumeSkills({ 
    data, 
    themeColor, 
    classes = {} 
}) {
    const { t } = useTranslation();

    if (!data || data.length === 0) return null;

    const {
        wrapper = "",
        title: titleClass = "",
        list = "flex flex-wrap gap-2",
        item = "px-3 py-1 text-[10px] rounded border font-medium"
    } = classes;

    return (
        <div className={wrapper}>
            <h3 
                className={titleClass} 
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
                {t('resume.sections.skills')}
            </h3>
            <div className={list}>
                {data.map((skill, index) => (
                    <span
                        key={index}
                        className={item}
                        style={{
                            borderColor: themeColor,
                            color: themeColor,
                            backgroundColor: `${themeColor}08`
                        }}
                    >
                        {skill?.name}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ResumeSkills