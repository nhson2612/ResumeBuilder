import React from 'react';

/**
 * SectionTitle component - Consistent section titles with various styles
 * 
 * @param {Object} props
 * @param {string} props.title - Section title text
 * @param {React.ReactNode} props.icon - Optional icon element
 * @param {'underline' | 'accent-bar' | 'icon-box' | 'minimal' | 'gradient' | 'border-left'} props.variant
 * @param {string} props.themeColor
 * @param {string} props.accentColor
 * @param {string} props.className - Additional CSS classes
 */
function SectionTitle({
    title,
    icon,
    variant = 'underline',
    themeColor = '#4f46e5',
    accentColor,
    className = '',
}) {
    const baseTextClass = 'text-[10px] font-bold uppercase tracking-widest';

    const renderTitle = () => {
        switch (variant) {
            case 'underline':
                return (
                    <h3
                        className={`${baseTextClass} pb-1.5 mb-3 border-b ${className}`}
                        style={{ color: themeColor, borderColor: `${themeColor}40` }}
                    >
                        {title}
                    </h3>
                );

            case 'accent-bar':
                return (
                    <h3
                        className={`${baseTextClass} mb-2 flex items-center gap-2 ${className}`}
                        style={{ color: themeColor }}
                    >
                        <span
                            className="w-4 h-0.5 rounded"
                            style={{ backgroundColor: themeColor }}
                        />
                        {title}
                    </h3>
                );

            case 'icon-box':
                return (
                    <div className={`flex items-center gap-2 mb-3 ${className}`}>
                        {icon && (
                            <div
                                className="w-6 h-6 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${accentColor || themeColor}15` }}
                            >
                                <span style={{ color: accentColor || themeColor }}>
                                    {icon}
                                </span>
                            </div>
                        )}
                        <h3
                            className={baseTextClass}
                            style={{ color: themeColor }}
                        >
                            {title}
                        </h3>
                        <div className="flex-1 h-px" style={{ backgroundColor: `${themeColor}15` }} />
                    </div>
                );

            case 'minimal':
                return (
                    <h3
                        className={`${baseTextClass} tracking-[0.2em] mb-4 ${className}`}
                        style={{ color: accentColor || themeColor }}
                    >
                        {title}
                    </h3>
                );

            case 'gradient':
                return (
                    <div className={`flex items-center gap-3 mb-4 ${className}`}>
                        {icon && (
                            <div
                                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md"
                                style={{
                                    background: `linear-gradient(135deg, ${themeColor} 0%, ${accentColor || themeColor} 100%)`
                                }}
                            >
                                {icon}
                            </div>
                        )}
                        <h3 className={`${baseTextClass} text-gray-900`}>
                            {title}
                        </h3>
                    </div>
                );

            case 'border-left':
                return (
                    <h3
                        className={`${baseTextClass} pb-2 mb-3 border-b-2 flex items-center gap-2 ${className}`}
                        style={{ color: themeColor, borderColor: themeColor }}
                    >
                        {icon && <span style={{ color: themeColor }}>{icon}</span>}
                        {title}
                    </h3>
                );

            default:
                return (
                    <h3
                        className={`${baseTextClass} ${className}`}
                        style={{ color: themeColor }}
                    >
                        {title}
                    </h3>
                );
        }
    };

    return renderTitle();
}

export default SectionTitle;
