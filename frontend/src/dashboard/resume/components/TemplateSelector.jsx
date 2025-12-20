import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutTemplate, Check, Sparkles } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'

const templates = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Traditional & elegant',
        color: '#1e3a5f',
        gradient: 'from-slate-600 to-slate-800'
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Two-column sidebar',
        color: '#4f46e5',
        gradient: 'from-indigo-500 to-purple-600'
    },
    {
        id: 'minimal',
        name: 'Minimal',
        description: 'Clean & simple',
        color: '#18181b',
        gradient: 'from-zinc-600 to-zinc-800'
    },
    {
        id: 'professional',
        name: 'Professional',
        description: 'Corporate style',
        color: '#0369a1',
        gradient: 'from-sky-600 to-blue-700'
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Premium corporate',
        color: '#0f172a',
        gradient: 'from-slate-800 to-blue-900',
        isNew: true
    },
    {
        id: 'creative',
        name: 'Creative',
        description: 'Bold & colorful',
        color: '#7c3aed',
        gradient: 'from-violet-500 to-pink-500',
        isNew: true
    },
]

function TemplateSelector() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedTemplate, setSelectedTemplate] = useState(resumeInfo?.template || 'classic');
    const [isOpen, setIsOpen] = useState(false);
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
            toast.success(`Template changed to ${templates.find(t => t.id === templateId)?.name}`)
        }).catch(err => {
            toast.error('Failed to update template')
        })
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2 hover:bg-primary/5 transition-all">
                    <LayoutTemplate className="w-4 h-4" /> Template
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="start">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                        <LayoutTemplate className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h2 className='text-sm font-bold'>Choose Template</h2>
                        <p className="text-[10px] text-gray-500">Select a design for your resume</p>
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-2'>
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => onTemplateSelect(template.id)}
                            className={`relative p-3 rounded-xl cursor-pointer border-2 transition-all duration-200 hover:scale-[1.02] hover:shadow-md
                                ${selectedTemplate === template.id
                                    ? 'border-primary bg-primary/5 shadow-sm'
                                    : 'border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            {/* New badge */}
                            {template.isNew && (
                                <div className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                                    <Sparkles className="w-2 h-2" />
                                    NEW
                                </div>
                            )}

                            {/* Selected checkmark */}
                            {selectedTemplate === template.id && (
                                <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="w-2.5 h-2.5 text-white" />
                                </div>
                            )}

                            {/* Template preview */}
                            <div
                                className={`w-full h-12 rounded-lg mb-2 bg-gradient-to-br ${template.gradient} shadow-sm`}
                            >
                                {/* Mini template preview */}
                                <div className="w-full h-full rounded-lg p-1.5 flex gap-1">
                                    {template.id === 'modern' || template.id === 'professional' || template.id === 'executive' ? (
                                        <>
                                            <div className="w-1/3 h-full bg-white/20 rounded-sm" />
                                            <div className="flex-1 space-y-0.5">
                                                <div className="w-3/4 h-1 bg-white/40 rounded-full" />
                                                <div className="w-1/2 h-0.5 bg-white/30 rounded-full" />
                                                <div className="w-full h-0.5 bg-white/20 rounded-full mt-1" />
                                                <div className="w-2/3 h-0.5 bg-white/20 rounded-full" />
                                            </div>
                                        </>
                                    ) : template.id === 'creative' ? (
                                        <>
                                            <div className="w-1/4 h-full space-y-0.5 flex flex-col justify-center">
                                                <div className="w-4 h-4 bg-white/30 rounded-lg mx-auto" />
                                            </div>
                                            <div className="flex-1 space-y-0.5">
                                                <div className="w-3/4 h-1 bg-white/40 rounded-full" />
                                                <div className="w-1/2 h-0.5 bg-white/30 rounded-full" />
                                                <div className="flex gap-0.5 mt-1">
                                                    <div className="w-2 h-2 bg-white/20 rounded" />
                                                    <div className="w-2 h-2 bg-white/20 rounded" />
                                                    <div className="w-2 h-2 bg-white/20 rounded" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full space-y-0.5 flex flex-col justify-center items-center">
                                            <div className="w-1/2 h-1 bg-white/40 rounded-full" />
                                            <div className="w-1/3 h-0.5 bg-white/30 rounded-full" />
                                            <div className="w-3/4 h-px bg-white/20 rounded-full mt-1" />
                                            <div className="flex gap-2 mt-0.5">
                                                <div className="w-3 h-0.5 bg-white/20 rounded-full" />
                                                <div className="w-3 h-0.5 bg-white/20 rounded-full" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <h3 className='text-xs font-semibold text-center text-gray-800'>
                                {template.name}
                            </h3>
                            <p className='text-[9px] text-gray-500 text-center leading-tight'>
                                {template.description}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="text-[9px] text-gray-400 text-center mt-3">
                    Tip: Try different templates to find the best fit for your industry
                </p>
            </PopoverContent>
        </Popover>
    )
}

export default TemplateSelector
