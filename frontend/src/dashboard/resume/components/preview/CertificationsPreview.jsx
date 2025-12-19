import React from 'react'

function CertificationsPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Certifications</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.Certifications?.map((cert, index) => (
                <div key={index} className='my-3'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{cert?.certName}</h2>
                    <h2 className='text-xs flex justify-between'>
                        <span>{cert?.issuer}</span>
                        <span>{cert?.issueDate}</span>
                    </h2>
                    {cert?.credentialUrl && (
                        <a href={cert?.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-xs text-blue-500 hover:underline'>
                            View Credential
                        </a>
                    )}
                </div>
            ))}
        </div>
    )
}

export default CertificationsPreview
