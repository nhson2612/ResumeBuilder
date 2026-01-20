/**
 * Theme presets for each CV template style
 * These presets can be used to quickly configure components
 */

export const classicPreset = {
    themeColor: '#1e3a5f',
    accentColor: '#1e3a5f',
    fontFamily: "'Merriweather', 'Georgia', serif",
    sectionTitleVariant: 'underline',
    skillVariant: 'outline',
    timelineVariant: 'none',
    bulletStyle: 'dot',
    dateVariant: 'text',
    headerVariant: 'centered',
    contactLayout: 'horizontal',
    showAvatar: false,
    sectionGap: 'space-y-5',
    contentPadding: 'px-8 py-5',
};

export const modernPreset = {
    themeColor: '#4f46e5',
    accentColor: '#4f46e5',
    fontFamily: "'Inter', system-ui, sans-serif",
    sectionTitleVariant: 'accent-bar',
    skillVariant: 'bar',
    timelineVariant: 'dot',
    bulletStyle: 'dot',
    dateVariant: 'badge',
    headerVariant: 'left-aligned',
    contactLayout: 'vertical',
    showAvatar: true,
    avatarPosition: 'left',
    sectionGap: 'space-y-5',
    contentPadding: 'p-6',
};

export const creativePreset = {
    themeColor: '#7c3aed',
    accentColor: '#ec4899',
    fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
    sectionTitleVariant: 'gradient',
    skillVariant: 'gradient',
    timelineVariant: 'filled',
    bulletStyle: 'square',
    dateVariant: 'gradient',
    headerVariant: 'creative',
    contactLayout: 'pills',
    showAvatar: true,
    avatarPosition: 'left',
    sectionGap: 'space-y-5',
    contentPadding: 'px-8 py-4',
};

export const executivePreset = {
    themeColor: '#0f172a',
    accentColor: '#3b82f6',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    sectionTitleVariant: 'icon-box',
    skillVariant: 'tag',
    timelineVariant: 'circle',
    bulletStyle: 'dot',
    dateVariant: 'badge',
    headerVariant: 'split',
    contactLayout: 'cards',
    showAvatar: false,
    sectionGap: 'space-y-5',
    contentPadding: 'px-8 py-5',
};

export const professionalPreset = {
    themeColor: '#0369a1',
    accentColor: '#0ea5e9',
    fontFamily: "'Inter', Georgia, serif",
    sectionTitleVariant: 'border-left',
    skillVariant: 'gradient',
    timelineVariant: 'circle',
    bulletStyle: 'arrow',
    dateVariant: 'gradient',
    headerVariant: 'left-aligned',
    contactLayout: 'cards',
    showAvatar: false,
    sectionGap: 'space-y-5',
    contentPadding: 'px-7 py-5',
};

export const minimalPreset = {
    themeColor: '#18181b',
    accentColor: '#71717a',
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    sectionTitleVariant: 'minimal',
    skillVariant: 'outline',
    timelineVariant: 'none',
    bulletStyle: 'dot',
    dateVariant: 'text',
    headerVariant: 'minimal',
    contactLayout: 'horizontal',
    showAvatar: false,
    sectionGap: 'space-y-8',
    contentPadding: 'px-10 py-10',
};

/**
 * Get preset by template name
 */
export function getPreset(templateName) {
    const presets = {
        classic: classicPreset,
        modern: modernPreset,
        creative: creativePreset,
        executive: executivePreset,
        professional: professionalPreset,
        minimal: minimalPreset,
    };

    return presets[templateName.toLowerCase()] || classicPreset;
}

/**
 * Create custom preset by merging with base preset
 */
export function createCustomPreset(basePresetName, customizations = {}) {
    const basePreset = getPreset(basePresetName);
    return { ...basePreset, ...customizations };
}

export default {
    classicPreset,
    modernPreset,
    creativePreset,
    executivePreset,
    professionalPreset,
    minimalPreset,
    getPreset,
    createCustomPreset,
};
