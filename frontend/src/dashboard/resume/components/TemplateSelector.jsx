import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutTemplate } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'

const templates = [
    { id: 'classic', name: 'Classic', description: 'Traditional & elegant', preview: '📄' },
    { id: 'modern', name: 'Modern', description: 'Two-column with sidebar', preview: '🎨' },
    { id: 'minimal', name: 'Minimal', description: 'Clean & simple', preview: '✨' },
    { id: 'professional', name: 'Professional', description: 'Corporate style', preview: '💼' },
]

function TemplateSelector() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedTemplate, setSelectedTemplate] = useState(resumeInfo?.template || 'classic');
    const { resumeId } = useParams();
    const { getToken } = useAuth();

    const onTemplateSelect = async (templateId) => {
        setSelectedTemplate(templateId);
        setResumeInfo({
            ...resumeInfo,
            template: templateId
        });

        const data = {
            data: {
                template: templateId
            }
        }

        const token = await getToken();
        GlobalApi.UpdateResumeDetail(resumeId, data, token).then(resp => {
            toast(`Template changed to ${templates.find(t => t.id === templateId)?.name}`)
        }).catch(err => {
            toast.error('Failed to update template')
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutTemplate className="w-4 h-4" /> Template
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <h2 className='mb-3 text-sm font-bold'>Select Template</h2>
                <div className='grid grid-cols-2 gap-2'>
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => onTemplateSelect(template.id)}
                            className={`p-3 rounded-lg cursor-pointer border-2 transition-all hover:border-primary
                                ${selectedTemplate === template.id
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200'
                                }`}
                        >
                            <div className='text-2xl text-center mb-1'>{template.preview}</div>
                            <h3 className='text-xs font-semibold text-center'>{template.name}</h3>
                            <p className='text-[10px] text-gray-500 text-center'>{template.description}</p>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default TemplateSelector
