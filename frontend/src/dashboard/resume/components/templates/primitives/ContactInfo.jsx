import React from 'react';

// SVG Icons as components
const EmailIcon = ({ className, style }) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);

const PhoneIcon = ({ className, style }) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const LocationIcon = ({ className, style }) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const LinkedInIcon = ({ className, style }) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
    </svg>
);

const GithubIcon = ({ className, style }) => (
    <svg className={className} style={style} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
    </svg>
);

const ICONS = {
    email: EmailIcon,
    phone: PhoneIcon,
    address: LocationIcon,
    city: LocationIcon,
    linkedIn: LinkedInIcon,
    github: GithubIcon,
};

/**
 * ContactInfo component - Unified contact information display
 * 
 * @param {Object} props
 * @param {string} props.email
 * @param {string} props.phone
 * @param {string} props.address
 * @param {string} props.city
 * @param {string} props.linkedIn
 * @param {string} props.github
 * @param {'horizontal' | 'vertical' | 'pills' | 'cards'} props.layout
 * @param {boolean} props.showIcons
 * @param {string} props.themeColor
 * @param {'left' | 'right'} props.iconPosition
 * @param {React.ReactNode} props.separator
 * @param {string} props.className
 * @param {string} props.textSize
 */
function ContactInfo({
    email,
    phone,
    address,
    city,
    linkedIn,
    github,
    layout = 'horizontal',
    showIcons = true,
    themeColor = '#4f46e5',
    iconPosition = 'left',
    separator = null,
    className = '',
    textSize = 'text-xs',
}) {
    const items = [
        { key: 'email', value: email, label: email },
        { key: 'phone', value: phone, label: phone },
        { key: 'address', value: address || city, label: address || city },
        { key: 'linkedIn', value: linkedIn, label: 'LinkedIn' },
        { key: 'github', value: github, label: github },
    ].filter(item => item.value);

    if (items.length === 0) return null;

    const layoutClasses = {
        horizontal: 'flex flex-wrap items-center gap-x-4 gap-y-1',
        vertical: 'flex flex-col space-y-2',
        pills: 'flex flex-wrap gap-2',
        cards: 'flex flex-col space-y-1.5 px-4 py-3 rounded-lg',
    };

    const renderItem = (item, index) => {
        const IconComponent = ICONS[item.key];
        const iconElement = showIcons && IconComponent && (
            <IconComponent
                className="w-3.5 h-3.5 flex-shrink-0"
                style={{ color: themeColor }}
            />
        );

        const contentOrder = iconPosition === 'right'
            ? [<span key="label">{item.label}</span>, iconElement]
            : [iconElement, <span key="label">{item.label}</span>];

        if (layout === 'pills') {
            return (
                <span
                    key={item.key}
                    className={`inline-flex items-center gap-1.5 ${textSize} px-3 py-1 rounded-full bg-gray-100 text-gray-600`}
                >
                    {contentOrder}
                </span>
            );
        }

        if (layout === 'cards') {
            return (
                <div
                    key={item.key}
                    className={`flex items-center ${iconPosition === 'right' ? 'justify-end' : ''} gap-2 ${textSize} text-gray-600`}
                >
                    {contentOrder}
                </div>
            );
        }

        return (
            <React.Fragment key={item.key}>
                <span className={`flex items-center gap-1.5 ${textSize} text-gray-500`}>
                    {contentOrder}
                </span>
                {separator && index < items.length - 1 && separator}
            </React.Fragment>
        );
    };

    return (
        <div className={`${layoutClasses[layout]} ${className}`}>
            {items.map((item, index) => renderItem(item, index))}
        </div>
    );
}

// Export icons for external use
export { EmailIcon, PhoneIcon, LocationIcon, LinkedInIcon, GithubIcon };
export default ContactInfo;
