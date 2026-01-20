import React from 'react'

const RichTextDisplay = ({ content, className, style }) => {
    if (!content) return null;

    if (content.includes('<li>')) {
        // Standardize the ul/li styles if passed via className, 
        // but typically rich text needs specific prose classes
        return (
            <div 
                className={className} 
                style={style}
                dangerouslySetInnerHTML={{ __html: content }} 
            />
        );
    }

    const lines = content.split('\n').filter(l => l.trim());
    if (lines.length > 1) {
        return (
            <ul className={className} style={style}>
                {lines.map((line, i) => (
                    <li key={i} className="flex items-start gap-2">
                        <span className="opacity-60 mt-1 scale-75">•</span>
                        <span>{line.replace(/^[-•*]\s*/, '')}</span>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <p className={className} style={style}>
            {content}
        </p>
    );
};

export default RichTextDisplay;