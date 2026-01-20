import React from 'react';

/**
 * Avatar component - Displays photo or initials fallback
 * 
 * @param {Object} props
 * @param {string} props.photoUrl - Photo URL
 * @param {string} props.firstName - For initials
 * @param {string} props.lastName - For initials
 * @param {'sm' | 'md' | 'lg' | 'xl'} props.size - Size variant
 * @param {'circle' | 'rounded' | 'square'} props.variant - Shape variant
 * @param {string} props.themeColor - Background color for initials
 * @param {{ from: string, to: string }} props.gradient - Gradient style
 * @param {string} props.className - Additional CSS classes
 */
function Avatar({
    photoUrl,
    firstName = '',
    lastName = '',
    size = 'md',
    variant = 'rounded',
    themeColor = '#4f46e5',
    gradient,
    className = '',
}) {
    const sizeClasses = {
        sm: 'w-12 h-12 text-sm',
        md: 'w-16 h-16 text-lg',
        lg: 'w-20 h-20 text-xl',
        xl: 'w-24 h-24 text-2xl',
    };

    const variantClasses = {
        circle: 'rounded-full',
        rounded: 'rounded-2xl',
        square: 'rounded-lg',
    };

    const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`;

    const backgroundStyle = gradient
        ? { background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)` }
        : { backgroundColor: themeColor };

    const baseClasses = `
        flex items-center justify-center 
        text-white font-bold 
        flex-shrink-0
        border-2 border-white/30 
        shadow-lg backdrop-blur-sm
    `;

    return (
        <div
            className={`
                ${baseClasses}
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${className}
            `}
            style={backgroundStyle}
        >
            {photoUrl ? (
                <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className={`w-full h-full object-cover ${variantClasses[variant]}`}
                />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
}

export default Avatar;
