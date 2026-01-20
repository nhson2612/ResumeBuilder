import React from 'react';

/**
 * SingleColumnLayout - Single column layout for Classic/Minimal templates
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.header - Header section
 * @param {React.ReactNode} props.children - Main content
 * @param {string} props.padding - Padding classes
 * @param {string} props.gap - Gap between sections
 * @param {string} props.fontFamily
 * @param {string} props.className
 * @param {string} props.bgColor - Background color
 */
function SingleColumnLayout({
    header,
    children,
    padding = 'px-8 py-5',
    gap = 'space-y-5',
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

            {/* Main Content */}
            <div className={`${padding} ${gap}`}>
                {children}
            </div>
        </div>
    );
}

export default SingleColumnLayout;
