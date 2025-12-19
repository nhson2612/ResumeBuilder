import React, { useState, useContext, useRef, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Send, Loader2, Sparkles, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'
import { TEMPLATE_CONFIGS, generateTemplatePrompt } from '../config/templateConfigs'

// Template Card with Flip Animation
function TemplateCard({ template, onSelect, isSelected }) {
    const [isFlipped, setIsFlipped] = useState(false)

    const sampleContent = {
        classic: {
            name: 'Nguyễn Văn A',
            title: 'Senior Software Engineer',
            exp: '5 năm kinh nghiệm Java, Spring Boot',
            edu: 'BKHN - CNTT'
        },
        modern: {
            name: 'Trần Minh B',
            title: 'Full Stack Developer',
            exp: 'React, Node.js, MongoDB',
            skills: 'TypeScript • Docker • AWS'
        },
        minimal: {
            name: 'Lê Thị C',
            title: 'UX Designer',
            exp: 'Figma, Adobe XD',
            edu: 'FPT University'
        },
        professional: {
            name: 'Phạm Đức D',
            title: 'Product Manager',
            exp: 'Led team 15+ người',
            achievement: 'Tăng revenue 200%'
        }
    }

    const sample = sampleContent[template.id] || sampleContent.classic

    return (
        <div
            className="perspective-1000 cursor-pointer group"
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            onClick={() => onSelect(template.id)}
        >
            <div className={`relative w-full h-64 transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front - Template Info */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rounded-xl border-2 p-5 flex flex-col items-center justify-center transition-all ${isSelected
                        ? 'border-purple-500 shadow-lg shadow-purple-500/30 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}>
                    <div className="text-5xl mb-3">{template.emoji}</div>
                    <h3 className="text-lg font-bold text-gray-800">{template.name}</h3>
                    <p className="text-xs text-gray-500 text-center mt-1 px-2">{template.description}</p>
                    <div
                        className="mt-3 w-8 h-1 rounded-full"
                        style={{ backgroundColor: template.color }}
                    />
                    <p className="text-[10px] text-gray-400 mt-4">Hover để xem mẫu</p>
                </div>

                {/* Back - Sample Preview */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl border-2 p-4 ${isSelected ? 'border-purple-500' : 'border-gray-200'
                    }`} style={{ backgroundColor: template.color + '08' }}>
                    <div className="h-full flex flex-col">
                        {/* Mini CV Preview */}
                        <div
                            className="text-[10px] text-white px-2 py-1 rounded-t font-medium"
                            style={{ backgroundColor: template.color }}
                        >
                            {sample.name}
                        </div>
                        <div className="flex-1 bg-white rounded-b p-2 text-[9px] space-y-1.5 border border-t-0 border-gray-200">
                            <div className="font-semibold" style={{ color: template.color }}>{sample.title}</div>
                            <div className="border-t pt-1">
                                <div className="font-medium text-gray-600">Experience</div>
                                <div className="text-gray-500">{sample.exp}</div>
                            </div>
                            {sample.edu && (
                                <div>
                                    <div className="font-medium text-gray-600">Education</div>
                                    <div className="text-gray-500">{sample.edu}</div>
                                </div>
                            )}
                            {sample.skills && (
                                <div className="text-gray-500">{sample.skills}</div>
                            )}
                            {sample.achievement && (
                                <div className="text-green-600">✓ {sample.achievement}</div>
                            )}
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] px-3 py-1 rounded-full text-white font-medium"
                                style={{ backgroundColor: template.color }}>
                                Chọn template này
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Base System Prompt
const BASE_SYSTEM_PROMPT = `Bạn là AI Career Coach chuyên nghiệp, giúp người dùng tạo CV chuẩn công nghiệp.

## PHONG CÁCH
- Thân thiện, chuyên nghiệp, động viên
- Hỏi CHI TIẾT để thu thập thông tin đầy đủ
- Đề xuất cải thiện, khen ngợi điểm mạnh
- Sử dụng emoji 🎯

## QUY TRÌNH THU THẬP CHI TIẾT

### BƯỚC 1: THÔNG TIN CÁ NHÂN
Hỏi lần lượt:
- Họ và tên đầy đủ
- Vị trí công việc mong muốn (hỏi rõ level: Fresher/Junior/Mid/Senior)
- Số năm kinh nghiệm
- Email (phải chuyên nghiệp)
- Số điện thoại
- Thành phố/Quốc gia
- LinkedIn URL (bắt buộc với template Modern/Professional)
- GitHub/Portfolio (cho IT)

### BƯỚC 2: KINH NGHIỆM LÀM VIỆC - RẤT CHI TIẾT
Với MỖI công việc, hỏi:
1. Tên công ty, thành phố
2. Vị trí/chức danh
3. Thời gian: tháng/năm bắt đầu - tháng/năm kết thúc
4. Responsibilities (3-5 điểm):
   - Hỏi: "Mô tả 3-5 trách nhiệm chính của bạn, mỗi điểm một dòng"
   - Gợi ý format: "Verb + action + result/metric"
5. Achievements:
   - Hỏi: "Thành tích nổi bật? Có số liệu cụ thể không? (% tăng trưởng, số users, revenue...)"
6. Tech stack/Tools sử dụng

Sau mỗi công việc, hỏi: "Bạn còn công việc nào khác muốn thêm không?"

### BƯỚC 3: HỌC VẤN
- Tên trường đầy đủ
- Bằng cấp (Bachelor, Master, PhD...)
- Chuyên ngành
- Năm bắt đầu - năm tốt nghiệp
- GPA (nếu >= 3.0/4.0)
- Thành tích học tập (học bổng, giải thưởng...)

### BƯỚC 4: KỸ NĂNG
Hỏi theo categories:
- Technical Skills: "Ngôn ngữ lập trình/công cụ chuyên môn bạn thành thạo?"
- Frameworks/Libraries: "Frameworks bạn có kinh nghiệm?"
- Tools: "Tools/Softwares sử dụng hàng ngày?"
- Soft Skills: "Kỹ năng mềm nổi bật? (leadership, communication...)"

Với mỗi skill, hỏi mức độ thành thạo (1-5) nếu cần

### BƯỚC 5: THÔNG TIN BỔ SUNG
- Chứng chỉ: Tên, tổ chức cấp, năm, credential ID
- Dự án cá nhân: Tên, tech stack, mô tả, link
- Ngôn ngữ: Tiếng Việt, Tiếng Anh (IELTS/TOEIC score)
- Giải thưởng: Tên giải, tổ chức, năm

## ĐÁNH GIÁ & GỢI Ý
- Nếu bullet points chung chung → gợi ý thêm metric cụ thể
- Nếu thiếu achievements → động viên thêm thành tích
- Nếu skills ít → gợi ý skills phổ biến trong ngành
- Khen ngợi thông tin tốt!

## KHI ĐỦ THÔNG TIN
Khi đã có ĐẦY ĐỦ thông tin theo template, hỏi xác nhận rồi trả về JSON:

\`\`\`json
{
  "status": "complete",
  "data": {
    "firstName": "",
    "lastName": "",
    "jobTitle": "",
    "email": "",
    "phone": "",
    "address": "",
    "city": "",
    "country": "",
    "linkedIn": "",
    "github": "",
    "website": "",
    "summary": "TỰ VIẾT professional summary 2-4 câu dựa trên profile",
    "experience": [{
      "title": "",
      "companyName": "",
      "city": "",
      "startDate": "MM/YYYY",
      "endDate": "MM/YYYY or Present",
      "currentlyWorking": false,
      "workSummery": "• Bullet 1\\n• Bullet 2\\n• Bullet 3\\n• Bullet 4"
    }],
    "education": [{
      "universityName": "",
      "degree": "",
      "major": "",
      "startDate": "YYYY",
      "endDate": "YYYY",
      "gpa": "",
      "description": ""
    }],
    "skills": [{"name": "", "rating": 4, "category": ""}],
    "languages": [{"language": "", "proficiency": "Native/Fluent/Intermediate"}],
    "Certifications": [{"certName": "", "issuer": "", "issueDate": "", "credentialId": ""}],
    "Projects": [{"projectName": "", "techStack": "", "description": "", "projectUrl": ""}],
    "awards": [{"title": "", "issuer": "", "date": ""}]
  }
}
\`\`\`

QUAN TRỌNG:
- Summary phải TỰ VIẾT, thể hiện value proposition
- workSummery dùng bullet points với \\n
- Mỗi tin nhắn CHỈ hỏi 1-2 thông tin
- Không hỏi tất cả một lúc!`

function AIResumeBuilder() {
    const [open, setOpen] = useState(false)
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [showTemplateSelection, setShowTemplateSelection] = useState(true)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const chatEndRef = useRef(null)

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const { resumeId } = useParams()
    const { getToken } = useAuth()

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleTemplateSelect = async (templateId) => {
        setSelectedTemplate(templateId)
        setShowTemplateSelection(false)
        setIsLoading(true)

        // Update resume with selected template
        const token = await getToken()
        await GlobalApi.UpdateResumeDetail(resumeId, { data: { template: templateId } }, token)
        setResumeInfo({ ...resumeInfo, template: templateId })

        // Start conversation with template context
        try {
            const templateConfig = TEMPLATE_CONFIGS[templateId]
            const initialMessage = await callAI([
                { role: 'user', content: `Tôi đã chọn template ${templateConfig.name}. Hãy giúp tôi tạo CV.` }
            ], templateId)
            setMessages([{ role: 'assistant', content: initialMessage }])
        } catch (error) {
            const templateConfig = TEMPLATE_CONFIGS[templateId]
            setMessages([{
                role: 'assistant',
                content: `Tuyệt vời! Bạn đã chọn template **${templateConfig.name}** ${templateConfig.emoji}\n\n${templateConfig.description}\n\n🎯 Để bắt đầu, cho tôi biết:\n1. **Họ tên đầy đủ** của bạn?\n2. **Vị trí công việc** bạn đang tìm kiếm?`
            }])
        }
        setIsLoading(false)
    }

    const callAI = async (conversationHistory, templateId = selectedTemplate) => {
        const token = await getToken()

        const templatePrompt = templateId ? generateTemplatePrompt(templateId) : ''

        const prompt = `${BASE_SYSTEM_PROMPT}

${templatePrompt}

LỊCH SỬ HỘI THOẠI:
${conversationHistory.map(m => `${m.role === 'user' ? '👤 Người dùng' : '🤖 AI'}: ${m.content}`).join('\n\n')}

Hãy trả lời phù hợp. Nhớ: CHI TIẾT, động viên, gợi ý cách viết tốt hơn.`

        const response = await GlobalApi.AIChat(prompt, token)
        let result = response.data.result || ''
        result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()

        return result
    }

    const extractJSON = (text) => {
        const patterns = [
            /```json\s*([\s\S]*?)```/,
            /```\s*([\s\S]*?)```/,
            /\{[\s\S]*"status"[\s\S]*"complete"[\s\S]*"data"[\s\S]*\}/
        ]

        for (const pattern of patterns) {
            const match = text.match(pattern)
            if (match) {
                try {
                    const jsonStr = match[1] || match[0]
                    return JSON.parse(jsonStr.trim())
                } catch (e) { continue }
            }
        }

        try {
            if (text.includes('"status"') && text.includes('"complete"')) {
                const start = text.indexOf('{')
                const end = text.lastIndexOf('}') + 1
                return JSON.parse(text.substring(start, end))
            }
        } catch (e) { }

        return null
    }

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessage = { role: 'user', content: inputValue }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInputValue('')
        setIsLoading(true)

        try {
            const aiResponse = await callAI(newMessages)
            const parsedData = extractJSON(aiResponse)

            if (parsedData?.status === 'complete' && parsedData?.data) {
                await applyResumeData(parsedData.data)
                setMessages([...newMessages, {
                    role: 'assistant',
                    content: '✅ **Hoàn thành!** CV của bạn đã được tạo xong.\n\n📋 Xem preview bên phải để kiểm tra.\n\n💡 Tips:\n- Thử Template khác để xem layout phù hợp nhất\n- Chỉnh sửa chi tiết trong các form'
                }])
                setIsComplete(true)
            } else {
                const cleanResponse = aiResponse.replace(/```json[\s\S]*?```/g, '').trim()
                setMessages([...newMessages, { role: 'assistant', content: cleanResponse || aiResponse }])
            }
        } catch (error) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: '❌ Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!'
            }])
        }

        setIsLoading(false)
    }

    const applyResumeData = async (data) => {
        const token = await getToken()

        const updateData = {
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            jobTitle: data.jobTitle || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            city: data.city || '',
            country: data.country || '',
            linkedIn: data.linkedIn || '',
            github: data.github || '',
            website: data.website || '',
            summary: data.summary || '',
        }

        if (data.experience?.length) updateData.Experience = data.experience
        if (data.education?.length) updateData.Education = data.education
        if (data.skills?.length) updateData.Skills = data.skills
        if (data.Certifications?.length) updateData.Certifications = data.Certifications
        if (data.Projects?.length) updateData.Projects = data.Projects
        if (data.languages?.length) updateData.languages = data.languages
        if (data.awards?.length) updateData.awards = data.awards

        setResumeInfo({
            ...resumeInfo,
            ...updateData,
            experience: data.experience,
            education: data.education,
            skills: data.skills,
        })

        await GlobalApi.UpdateResumeDetail(resumeId, { data: updateData }, token)
        toast.success('🎉 CV đã được tạo thành công!')
    }

    const resetChat = () => {
        setMessages([])
        setSelectedTemplate(null)
        setShowTemplateSelection(true)
        setIsComplete(false)
    }

    const goBackToTemplates = () => {
        setShowTemplateSelection(true)
        setMessages([])
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) resetChat()
        }}>
            <DialogTrigger asChild>
                <Button
                    variant="default"
                    size="sm"
                    className="flex gap-2 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 shadow-lg shadow-purple-500/25"
                >
                    <Sparkles className="w-4 h-4" /> AI Tạo CV
                </Button>
            </DialogTrigger>
            <DialogContent className={`${showTemplateSelection ? 'max-w-3xl' : 'max-w-xl'} max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden`}>
                <DialogHeader className="px-4 py-3 border-b bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white">
                    <DialogTitle className="flex items-center gap-2 text-white">
                        {!showTemplateSelection && (
                            <button onClick={goBackToTemplates} className="hover:bg-white/20 p-1 rounded">
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        )}
                        <Bot className="w-5 h-5" />
                        {showTemplateSelection ? 'Chọn Template CV' : `AI Career Coach - ${TEMPLATE_CONFIGS[selectedTemplate]?.name}`}
                        {isComplete && <CheckCircle className="w-4 h-4 text-green-300" />}
                    </DialogTitle>
                </DialogHeader>

                {showTemplateSelection ? (
                    /* Template Selection Grid */
                    <div className="p-6 bg-gray-50">
                        <p className="text-center text-gray-600 mb-6">
                            Hover để xem mẫu • Click để chọn template
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.values(TEMPLATE_CONFIGS).map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    onSelect={handleTemplateSelect}
                                    isSelected={selectedTemplate === template.id}
                                />
                            ))}
                        </div>

                        {/* CSS for flip animation */}
                        <style>{`
                            .perspective-1000 { perspective: 1000px; }
                            .transform-style-3d { transform-style: preserve-3d; }
                            .backface-hidden { backface-visibility: hidden; }
                            .rotate-y-180 { transform: rotateY(180deg); }
                        `}</style>
                    </div>
                ) : (
                    /* Chat Interface */
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[400px] max-h-[500px]">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-br-md'
                                            : 'bg-white border border-gray-200 rounded-bl-md'
                                        }`}>
                                        <div className="whitespace-pre-wrap">{msg.content}</div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border shadow-sm p-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-3 border-t bg-white">
                            <div className="flex gap-2">
                                <Textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault()
                                            handleSendMessage()
                                        }
                                    }}
                                    placeholder={isComplete ? "CV đã hoàn thành! 🎉" : "Nhập câu trả lời..."}
                                    disabled={isLoading || isComplete}
                                    className="flex-1 min-h-[44px] max-h-[120px] resize-none"
                                    rows={1}
                                />
                                {isComplete ? (
                                    <Button onClick={resetChat} size="icon" variant="outline" className="h-11 w-11">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !inputValue.trim()}
                                        size="icon"
                                        className="h-11 w-11 bg-gradient-to-r from-violet-500 to-purple-600"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default AIResumeBuilder
