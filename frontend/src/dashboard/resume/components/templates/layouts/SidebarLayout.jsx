import React from 'react';

/**
 * SidebarLayout - Sidebar layout for Modern template
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.sidebar - Sidebar content
 * @param {React.ReactNode} props.main - Main content
 * @param {'left' | 'right'} props.sidebarPosition - Sidebar position
 * @param {string} props.sidebarWidth - Sidebar width (e.g., "34%")
 * @param {string} props.sidebarBgColor - Sidebar background color
 * @param {boolean} props.sidebarGradient - Add gradient overlay to sidebar
 * @param {string} props.fontFamily
 * @param {string} props.className
 * @param {string} props.mainPadding - Main content padding
 */
function SidebarLayout({
    sidebar,
    main,
    sidebarPosition = 'left',
    sidebarWidth = '34%',
    sidebarBgColor = '#4f46e5',
    sidebarGradient = true,
    fontFamily = "'Inter', system-ui, sans-serif",
    className = '',
    mainPadding = 'p-6',
}) {
    const mainWidth = `${100 - parseInt(sidebarWidth)}%`;

    const sidebarContent = (
        <div
            className="p-5 text-white relative overflow-hidden h-full"
            style={{
                backgroundColor: sidebarBgColor,
                width: sidebarWidth,
            }}
        >
            {/* Decorative gradient overlay */}
            {sidebarGradient && (
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 100%)'
                    }}
                />
            )}

            {/* Sidebar content with relative z-index */}
            <div className="relative z-10">
                {sidebar}
            </div>
        </div>
    );

    const mainContent = (
        <div
            className={mainPadding}
            style={{ width: mainWidth }}
        >
            {main}
        </div>
    );

    return (
        <div
            className={`bg-white h-full flex ${className}`}
            style={{ fontFamily }}
        >
            {sidebarPosition === 'left' ? (
                <>
                    {sidebarContent}
                    {mainContent}
                </>
            ) : (
                <>
                    {mainContent}
                    {sidebarContent}
                </>
            )}
        </div>
    );
}

export default SidebarLayout;
