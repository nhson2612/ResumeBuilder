import React from 'react';

/**
 * TimelineItem component - Timeline-style item for experience/education
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display
 * @param {boolean} props.showConnector - Show vertical line
 * @param {'dot' | 'circle' | 'filled' | 'none'} props.variant - Marker style
 * @param {string} props.themeColor
 * @param {string} props.className
 */
function TimelineItem({
    children,
    showConnector = true,
    variant = 'dot',
    themeColor = '#4f46e5',
    className = '',
}) {
    const renderMarker = () => {
        switch (variant) {
            case 'dot':
                return (
                    <div
                        className="absolute left-[-3px] top-1 w-2 h-2 rounded-full border-2 bg-white"
                        style={{ borderColor: themeColor }}
                    />
                );

            case 'circle':
                return (
                    <div
                        className="absolute left-[-3px] top-1 w-2.5 h-2.5 rounded-full border-2 bg-white"
                        style={{ borderColor: themeColor }}
                    />
                );

            case 'filled':
                return (
                    <div
                        className="absolute left-[-3px] top-1 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: themeColor }}
                    />
                );

            case 'none':
            default:
                return null;
        }
    };

    if (variant === 'none' && !showConnector) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div className={`relative pl-5 ${className}`}>
            {/* Vertical connector line */}
            {showConnector && (
                <div
                    className="absolute left-0 top-0 bottom-0 w-0.5"
                    style={{ backgroundColor: `${themeColor}25` }}
                />
            )}

            {/* Marker */}
            {renderMarker()}

            {/* Content */}
            {children}
        </div>
    );
}

export default TimelineItem;
