import React from 'react';
import Avatar from './Avatar';
import ContactInfo from './ContactInfo';

/**
 * HeaderBlock component - Complete header with name, title, contact, optional avatar
 * 
 * @param {Object} props
 * @param {Object} props.resumeInfo - Full resume data
 * @param {'centered' | 'left-aligned' | 'split' | 'minimal' | 'creative'} props.variant
 * @param {boolean} props.showAvatar
 * @param {'left' | 'right'} props.avatarPosition
 * @param {string} props.themeColor
 * @param {{ from: string, to: string }} props.gradient
 * @param {string} props.fontFamily
 * @param {string} props.className
 * @param {'horizontal' | 'vertical' | 'pills' | 'cards'} props.contactLayout
 */
function HeaderBlock({
    resumeInfo,
    variant = 'centered',
    showAvatar = false,
    avatarPosition = 'left',
    themeColor = '#4f46e5',
    gradient,
    fontFamily,
    className = '',
    contactLayout = 'horizontal',
}) {
    const { firstName, lastName, jobTitle, email, phone, address, city, linkedIn, github, photoUrl } = resumeInfo || {};

    const renderAvatar = () => {
        if (!showAvatar) return null;
        return (
            <Avatar
                photoUrl={photoUrl}
                firstName={firstName}
                lastName={lastName}
                size="lg"
                variant="rounded"
                themeColor={themeColor}
                gradient={gradient}
            />
        );
    };

    const renderName = (nameClass = '', fontWeight = 'font-bold') => (
        <h1 className={nameClass} style={{ color: themeColor }}>
            {firstName}{' '}
            <span className={fontWeight}>{lastName}</span>
        </h1>
    );

    const renderJobTitle = (titleClass = '') => (
        <h2 className={titleClass}>
            {jobTitle}
        </h2>
    );

    const renderContact = () => (
        <ContactInfo
            email={email}
            phone={phone}
            address={address}
            city={city}
            linkedIn={linkedIn}
            github={github}
            layout={contactLayout}
            showIcons={true}
            themeColor={themeColor}
        />
    );

    switch (variant) {
        case 'centered':
            return (
                <div
                    className={`text-center border-b-4 px-8 pt-8 pb-5 ${className}`}
                    style={{ borderColor: themeColor, fontFamily }}
                >
                    {showAvatar && (
                        <div className="flex justify-center mb-4">
                            {renderAvatar()}
                        </div>
                    )}
                    {renderName('text-3xl font-bold tracking-wide uppercase', 'font-bold')}
                    {renderJobTitle('text-sm mt-2 text-gray-600 font-medium tracking-wide')}
                    <div className="mt-3">
                        {renderContact()}
                    </div>
                </div>
            );

        case 'left-aligned':
            return (
                <div
                    className={`px-8 py-6 ${className}`}
                    style={{ fontFamily }}
                >
                    <div className={`flex items-start gap-6 ${avatarPosition === 'right' ? 'flex-row-reverse' : ''}`}>
                        {renderAvatar()}
                        <div className="flex-1">
                            {renderName('text-3xl tracking-tight', 'font-bold')}
                            <h2
                                className="text-sm font-semibold mt-1 tracking-wide"
                                style={{ color: themeColor }}
                            >
                                {jobTitle}
                            </h2>
                            <div className="mt-3">
                                {renderContact()}
                            </div>
                        </div>
                    </div>
                </div>
            );

        case 'split':
            return (
                <div
                    className={`px-8 py-6 ${className}`}
                    style={{ fontFamily }}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-light tracking-tight" style={{ color: themeColor }}>
                                {firstName}{' '}
                                <span className="font-bold">{lastName}</span>
                            </h1>
                            <h2
                                className="text-sm font-medium mt-1 tracking-wide uppercase"
                                style={{ color: gradient ? gradient.to : themeColor }}
                            >
                                {jobTitle}
                            </h2>
                        </div>
                        <ContactInfo
                            email={email}
                            phone={phone}
                            address={address}
                            city={city}
                            linkedIn={linkedIn}
                            layout="cards"
                            showIcons={true}
                            themeColor={themeColor}
                            iconPosition="right"
                            className="bg-gray-50/50 rounded-lg"
                        />
                    </div>
                </div>
            );

        case 'minimal':
            return (
                <div className={`mb-8 ${className}`} style={{ fontFamily }}>
                    <h1 className="text-4xl font-extralight tracking-tight" style={{ color: themeColor }}>
                        {firstName}{' '}
                        <span className="font-semibold">{lastName}</span>
                    </h1>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-3">
                        <span className="text-sm font-medium text-gray-500">
                            {jobTitle}
                        </span>
                        {email && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                <span className="text-xs text-gray-400">{email}</span>
                            </>
                        )}
                        {phone && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                <span className="text-xs text-gray-400">{phone}</span>
                            </>
                        )}
                        {address && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gray-400" />
                                <span className="text-xs text-gray-400">{address}</span>
                            </>
                        )}
                    </div>
                    <div className="mt-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
            );

        case 'creative':
            return (
                <div className={`relative px-8 pt-8 pb-6 ${className}`} style={{ fontFamily }}>
                    {/* Decorative shapes */}
                    <div
                        className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
                        style={{
                            background: gradient
                                ? `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                                : themeColor
                        }}
                    />
                    <div
                        className="absolute top-20 right-20 w-20 h-20 rounded-full opacity-10"
                        style={{
                            background: gradient
                                ? `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                                : themeColor
                        }}
                    />

                    <div className="relative z-10 flex items-start gap-6">
                        {showAvatar && (
                            <Avatar
                                photoUrl={photoUrl}
                                firstName={firstName}
                                lastName={lastName}
                                size="xl"
                                variant="rounded"
                                gradient={gradient}
                                themeColor={themeColor}
                            />
                        )}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                                {firstName}{' '}
                                <span
                                    className="bg-clip-text text-transparent"
                                    style={{
                                        backgroundImage: gradient
                                            ? `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`
                                            : `linear-gradient(135deg, ${themeColor} 0%, ${themeColor} 100%)`
                                    }}
                                >
                                    {lastName}
                                </span>
                            </h1>
                            <h2 className="text-sm font-semibold text-gray-500 mt-1 tracking-wide">
                                {jobTitle}
                            </h2>
                            <div className="mt-3">
                                <ContactInfo
                                    email={email}
                                    phone={phone}
                                    address={address}
                                    city={city}
                                    linkedIn={linkedIn}
                                    layout="pills"
                                    showIcons={true}
                                    themeColor={themeColor}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            );

        default:
            return (
                <div className={className} style={{ fontFamily }}>
                    {renderName('text-2xl font-bold')}
                    {renderJobTitle('text-sm text-gray-600 mt-1')}
                    <div className="mt-2">{renderContact()}</div>
                </div>
            );
    }
}

export default HeaderBlock;
