import React from 'react';

/**
 * SkillBadge component - Skill display with multiple styles
 * 
 * @param {Object} props
 * @param {string} props.name - Skill name
 * @param {number} props.rating - 1-5 rating
 * @param {'pill' | 'tag' | 'bar' | 'dots' | 'gradient' | 'outline'} props.variant
 * @param {string} props.themeColor
 * @param {string} props.accentColor - For gradient variant
 * @param {boolean} props.showRating
 * @param {string} props.className
 */
function SkillBadge({
    name,
    rating = 3,
    variant = 'pill',
    themeColor = '#4f46e5',
    accentColor,
    showRating = false,
    className = '',
}) {
    const renderRating = () => {
        if (!showRating) return null;

        if (variant === 'bar') {
            return (
                <div className="w-full bg-white/15 rounded-full h-1.5 overflow-hidden mt-1">
                    <div
                        className="bg-white/80 rounded-full h-1.5 transition-all duration-500"
                        style={{ width: `${rating * 20}%` }}
                    />
                </div>
            );
        }

        if (variant === 'dots') {
            return (
                <div className="flex gap-0.5 ml-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                        <div
                            key={level}
                            className="w-2 h-2 rounded-full"
                            style={{
                                backgroundColor: level <= rating ? themeColor : '#e5e7eb',
                            }}
                        />
                    ))}
                </div>
            );
        }

        return null;
    };

    switch (variant) {
        case 'pill':
            return (
                <span
                    className={`text-[10px] px-2.5 py-1.5 rounded-lg font-medium text-white shadow-sm ${className}`}
                    style={{ backgroundColor: themeColor }}
                >
                    {name}
                    {renderRating()}
                </span>
            );

        case 'gradient':
            return (
                <span
                    className={`text-[10px] px-2.5 py-1.5 rounded-lg font-medium text-white shadow-sm ${className}`}
                    style={{
                        background: `linear-gradient(135deg, ${themeColor} 0%, ${accentColor || themeColor} 100%)`
                    }}
                >
                    {name}
                    {renderRating()}
                </span>
            );

        case 'tag':
            return (
                <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-medium transition-all ${className}`}
                    style={{
                        backgroundColor: `${themeColor}15`,
                        color: themeColor,
                        border: `1px solid ${themeColor}30`,
                    }}
                >
                    {name}
                    {renderRating()}
                </span>
            );

        case 'outline':
            return (
                <span
                    className={`px-3 py-1 text-[10px] rounded border font-medium ${className}`}
                    style={{
                        borderColor: themeColor,
                        color: themeColor,
                        backgroundColor: `${themeColor}08`,
                    }}
                >
                    {name}
                </span>
            );

        case 'bar':
            return (
                <div className={className}>
                    <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-medium text-white">{name}</span>
                    </div>
                    {renderRating()}
                </div>
            );

        case 'dots':
            return (
                <div className={`flex items-center justify-between ${className}`}>
                    <span className="text-xs font-medium" style={{ color: themeColor }}>
                        {name}
                    </span>
                    {renderRating()}
                </div>
            );

        default:
            return (
                <span
                    className={`text-[10px] font-medium ${className}`}
                    style={{ color: themeColor }}
                >
                    {name}
                </span>
            );
    }
}

export default SkillBadge;
