import React from 'react'

function ProjectsPreview({ resumeInfo }) {
    return (
        <div className='my-6'>
            <h2 className='text-center font-bold text-sm mb-2'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Projects</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />

            {resumeInfo?.Projects?.map((project, index) => (
                <div key={index} className='my-5'>
                    <h2 className='text-sm font-bold'
                        style={{
                            color: resumeInfo?.themeColor
                        }}>{project?.projectName}</h2>
                    <h2 className='text-xs flex justify-between'>
                        <span className='text-gray-600'>{project?.techStack}</span>
                        <span>{project?.startDate} {project?.endDate && `- ${project?.endDate}`}</span>
                    </h2>
                    {project?.projectUrl && (
                        <a href={project?.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-xs text-blue-500 hover:underline'>
                            {project?.projectUrl}
                        </a>
                    )}
                    <div className='text-xs my-2' dangerouslySetInnerHTML={{ __html: project?.description }} />
                </div>
            ))}
        </div>
    )
}

export default ProjectsPreview
