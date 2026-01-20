import React from 'react'
import { useTranslation } from 'react-i18next';

function ResumeSummary({ 
    summary, 
    themeColor, 
    classes = {} 
}) {
    const { t } = useTranslation();

    if (!summary) return null;

    const {
        wrapper = "",
        title: titleClass = "",
        text = "text-xs text-gray-600 leading-relaxed text-justify"
    } = classes;

    return (
        <div className={wrapper}>
            <h3 
                className={titleClass} 
                style={{ color: themeColor, borderColor: `${themeColor}40` }}
            >
                {t('resume.sections.summary')}
            </h3>
            <p className={text}>
                {summary}
            </p>
        </div>
    )
}

export default ResumeSummary