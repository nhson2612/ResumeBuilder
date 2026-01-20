import React from 'react';

/**
 * BulletList component - Enhanced bullet point list
 * 
 * @param {Object} props
 * @param {string} props.content - Raw text or HTML content
 * @param {'dot' | 'check' | 'arrow' | 'square' | 'gradient' | 'none'} props.bulletStyle
 * @param {string} props.themeColor
 * @param {string} props.accentColor - For gradient style
 * @param {string} props.className
 * @param {string} props.textClass
 */
function BulletList({
    content,
    bulletStyle = 'dot',
    themeColor = '#4f46e5',
    accentColor,
    className = '',
    textClass = 'text-[11px] text-gray-600 leading-relaxed',
}) {
    if (!content) return null;

    // Handle HTML content with <li> tags
    if (content.includes('<li>')) {
        return (
            <div
                className={`prose-sm mt-1.5 ${className}`}
                dangerouslySetInnerHTML={{ __html: content }}
            />
        );
    }

    // Parse text into lines
    const lines = content.split('\n').filter(l => l.trim());

    // Single line - render as paragraph
    if (lines.length <= 1) {
        return (
            <p className={`${textClass} mt-1 ${className}`}>
                {content}
            </p>
        );
    }

    const renderBullet = () => {
        switch (bulletStyle) {
            case 'dot':
                return (
                    <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: themeColor, opacity: 0.6 }}
                    />
                );

            case 'check':
                return (
                    <svg
                        className="w-3 h-3 mt-0.5 flex-shrink-0"
                        style={{ color: themeColor }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                );

            case 'arrow':
                return (
                    <svg
                        className="w-3 h-3 mt-0.5 flex-shrink-0"
                        style={{ color: themeColor }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                );

            case 'square':
                return (
                    <span
                        className="mt-1 w-2 h-2 rounded-sm flex-shrink-0"
                        style={{
                            background: accentColor
                                ? `linear-gradient(135deg, ${themeColor} 0%, ${accentColor} 100%)`
                                : themeColor,
                        }}
                    />
                );

            case 'gradient':
                return (
                    <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                            background: `linear-gradient(135deg, ${themeColor} 0%, ${accentColor || themeColor} 100%)`,
                        }}
                    />
                );

            case 'none':
                return null;

            default:
                return (
                    <span className="opacity-60 mt-0.5 scale-75">•</span>
                );
        }
    };

    return (
        <ul className={`mt-2 space-y-1 ${className}`}>
            {lines.map((line, i) => (
                <li key={i} className={`flex items-start gap-2 ${textClass}`}>
                    {renderBullet()}
                    <span>{line.replace(/^[-•*]\s*/, '')}</span>
                </li>
            ))}
        </ul>
    );
}

export default BulletList;
