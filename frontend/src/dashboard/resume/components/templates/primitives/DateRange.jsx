import React from 'react';

/**
 * DateRange component - Consistent date range formatting
 * 
 * @param {Object} props
 * @param {string} props.startDate
 * @param {string} props.endDate
 * @param {boolean} props.isCurrent - Shows "Present" instead of endDate
 * @param {'badge' | 'text' | 'pill' | 'gradient'} props.variant
 * @param {string} props.themeColor
 * @param {string} props.accentColor - For gradient variant
 * @param {string} props.separator - Default is "—"
 * @param {string} props.className
 */
function DateRange({
    startDate,
    endDate,
    isCurrent = false,
    variant = 'text',
    themeColor = '#4f46e5',
    accentColor,
    separator = '—',
    className = '',
}) {
    const displayEndDate = isCurrent ? 'Present' : endDate;
    const dateText = `${startDate} ${separator} ${displayEndDate}`;

    switch (variant) {
        case 'badge':
            return (
                <span
                    className={`text-[9px] px-2 py-0.5 rounded-full font-medium ${className}`}
                    style={{
                        backgroundColor: `${themeColor}15`,
                        color: themeColor,
                    }}
                >
                    {dateText}
                </span>
            );

        case 'pill':
            return (
                <span
                    className={`text-[9px] px-2.5 py-1 rounded-full text-white font-medium shadow-sm ${className}`}
                    style={{ backgroundColor: themeColor }}
                >
                    {dateText}
                </span>
            );

        case 'gradient':
            return (
                <span
                    className={`text-[9px] px-2.5 py-1 rounded-full text-white font-medium shadow-sm ${className}`}
                    style={{
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${accentColor || themeColor} 100%)`
                    }}
                >
                    {dateText}
                </span>
            );

        case 'text':
        default:
            return (
                <span
                    className={`text-[9px] text-gray-400 ${className}`}
                >
                    {dateText}
                </span>
            );
    }
}

export default DateRange;
