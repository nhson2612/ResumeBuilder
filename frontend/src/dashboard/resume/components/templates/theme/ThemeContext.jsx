import React, { createContext, useContext } from 'react';

/**
 * Default theme configuration
 */
const defaultTheme = {
    // Colors
    themeColor: '#1e3a5f',
    accentColor: '#3b82f6',

    // Typography
    fontFamily: "'Inter', system-ui, sans-serif",

    // Component Variants
    sectionTitleVariant: 'underline', // 'underline' | 'accent-bar' | 'icon-box' | 'minimal' | 'gradient'
    skillVariant: 'outline',          // 'pill' | 'tag' | 'bar' | 'dots' | 'gradient' | 'outline'
    timelineVariant: 'dot',           // 'dot' | 'circle' | 'filled' | 'none'
    bulletStyle: 'dot',               // 'dot' | 'check' | 'arrow' | 'square' | 'gradient' | 'none'
    dateVariant: 'text',              // 'badge' | 'text' | 'pill' | 'gradient'
    headerVariant: 'centered',        // 'centered' | 'left-aligned' | 'split' | 'minimal' | 'creative'
    contactLayout: 'horizontal',      // 'horizontal' | 'vertical' | 'pills' | 'cards'

    // Layout
    showAvatar: false,
    avatarPosition: 'left',

    // Spacing
    sectionGap: 'space-y-5',
    contentPadding: 'px-8 py-5',
};

/**
 * Theme Context
 */
const ThemeContext = createContext(defaultTheme);

/**
 * Theme Provider Component
 */
function ThemeProvider({ theme = {}, children }) {
    const mergedTheme = { ...defaultTheme, ...theme };

    return (
        <ThemeContext.Provider value={mergedTheme}>
            {children}
        </ThemeContext.Provider>
    );
}

/**
 * Hook to access theme
 */
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        return defaultTheme;
    }
    return context;
}

/**
 * Helper to get gradient style object
 */
function getGradientStyle(from, to) {
    return {
        background: `linear-gradient(135deg, ${from} 0%, ${to || from} 100%)`
    };
}

/**
 * Helper to get color with opacity
 */
function getColorWithOpacity(color, opacity) {
    // Supports hex colors only (6 digit)
    if (color.startsWith('#') && color.length === 7) {
        const opacityHex = Math.round(opacity * 255).toString(16).padStart(2, '0');
        return `${color}${opacityHex}`;
    }
    return color;
}

export {
    ThemeContext,
    ThemeProvider,
    useTheme,
    defaultTheme,
    getGradientStyle,
    getColorWithOpacity
};
