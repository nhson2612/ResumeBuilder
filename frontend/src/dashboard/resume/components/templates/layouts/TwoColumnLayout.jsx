import React from 'react';

/**
 * TwoColumnLayout - Two column layout for Executive/Professional/Creative templates
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.header - Header section (spans full width)
 * @param {React.ReactNode} props.leftColumn - Left column content
 * @param {React.ReactNode} props.rightColumn - Right column content
 * @param {string} props.leftWidth - Left column width (e.g., "65%")
 * @param {string} props.rightWidth - Right column width (e.g., "35%")
 * @param {string} props.gap - Gap between columns
 * @param {string} props.padding - Padding for the content area
 * @param {string} props.fontFamily
 * @param {string} props.className
 * @param {string} props.bgColor - Background color
 */
function TwoColumnLayout({
    header,
    leftColumn,
    rightColumn,
    leftWidth = '65%',
    rightWidth = '35%',
    gap = 'gap-6',
    padding = 'px-8 py-5',
    fontFamily = "'Inter', system-ui, sans-serif",
    className = '',
    bgColor = 'bg-white',
}) {
    return (
        <div
            className={`${bgColor} h-full ${className}`}
            style={{ fontFamily }}
        >
            {/* Header */}
            {header}

            {/* Two Column Content */}
            <div className={`flex ${padding} ${gap}`}>
                {/* Left Column */}
                <div style={{ width: leftWidth }}>
                    {leftColumn}
                </div>

                {/* Right Column */}
                <div style={{ width: rightWidth }} className="space-y-4">
                    {rightColumn}
                </div>
            </div>
        </div>
    );
}

export default TwoColumnLayout;
