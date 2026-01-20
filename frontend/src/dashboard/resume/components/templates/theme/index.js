// Theme System - Consistent styling across templates
export {
    ThemeContext,
    ThemeProvider,
    useTheme,
    defaultTheme,
    getGradientStyle,
    getColorWithOpacity
} from './ThemeContext';

export {
    classicPreset,
    modernPreset,
    creativePreset,
    executivePreset,
    professionalPreset,
    minimalPreset,
    getPreset,
    createCustomPreset,
} from './presets';
