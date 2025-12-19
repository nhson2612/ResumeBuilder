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
import { MessageSquare, Send, Loader2, CheckCircle, RefreshCw, Mic, ArrowRight } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

const INTERVIEW_SYSTEM_PROMPT = `Bạn là một nhà tuyển dụng (Interviewer) chuyên nghiệp, đang phỏng vấn ứng viên.

## THÔNG TIN ỨNG VIÊN:
{{RESUME_DATA}}

## CÁCH THỨC PHỎNG VẤN
1. Đặt câu hỏi dựa trên CV của ứng viên
2. Hỏi về kinh nghiệm, dự án, kỹ năng được liệt kê
3. Đặt câu hỏi behavioral: "Kể về một lần bạn..."
4. Đặt câu hỏi technical phù hợp với vị trí
5. Sau mỗi câu trả lời, đánh giá ngắn gọn và đưa feedback

## FLOW
- Bắt đầu bằng câu hỏi giới thiệu bản thân
- Tiếp tục với 5-7 câu hỏi chính
- Kết thúc với câu hỏi "Bạn có câu hỏi gì cho tôi không?"

## ĐÁNH GIÁ CÂU TRẢ LỜI
Sau mỗi câu trả lời của ứng viên:
- Đánh giá: ✅ Tốt / ⚠️ Cần cải thiện / ❌ Yếu
- Feedback ngắn gọn: điểm mạnh, điểm cần cải thiện
- Gợi ý cách trả lời tốt hơn (nếu cần)

## FORMAT TRẢ LỜI
**[Đánh giá câu trả lời trước]**
(Nếu có câu trả lời trước)

**Câu hỏi tiếp theo:**
[Câu hỏi phỏng vấn]

💡 *Gợi ý: [Tips ngắn cho câu hỏi này]*`

function InterviewPrep() {
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [questionCount, setQuestionCount] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const chatEndRef = useRef(null)

    const { resumeInfo } = useContext(ResumeInfoContext)
    const { resumeId } = useParams()
    const { getToken } = useAuth()
    const { t } = useTranslation()

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const buildResumeContext = () => {
        if (!resumeInfo) return 'Chưa có thông tin CV'

        return `
Họ tên: ${resumeInfo.firstName || ''} ${resumeInfo.lastName || ''}
Vị trí ứng tuyển: ${resumeInfo.jobTitle || ''}
Summary: ${resumeInfo.summary || ''}

Kinh nghiệm:
${resumeInfo.Experience?.map(e => `- ${e.title} tại ${e.companyName} (${e.startDate} - ${e.endDate || 'Present'}): ${e.workSummery?.substring(0, 200) || ''}`).join('\n') || 'Chưa có'}

Học vấn:
${resumeInfo.education?.map(e => `- ${e.degree} ${e.major} tại ${e.universityName}`).join('\n') || 'Chưa có'}

Kỹ năng: ${resumeInfo.skills?.map(s => s.name).join(', ') || 'Chưa có'}

Projects: ${resumeInfo.Projects?.map(p => p.projectName).join(', ') || 'Chưa có'}

Chứng chỉ: ${resumeInfo.Certifications?.map(c => c.certName).join(', ') || 'Chưa có'}
`
    }

    const startInterview = async () => {
        setIsLoading(true)
        setIsComplete(false)
        setQuestionCount(0)

        try {
            const response = await callAI([
                { role: 'user', content: 'Xin chào, tôi đã sẵn sàng cho buổi phỏng vấn.' }
            ])
            setMessages([{ role: 'assistant', content: response }])
            setQuestionCount(1)
        } catch (error) {
            setMessages([{
                role: 'assistant',
                content: `Xin chào **${resumeInfo?.firstName || 'bạn'}**! 👋\n\nTôi là nhà tuyển dụng hôm nay. Tôi đã xem qua CV của bạn và rất ấn tượng.\n\n**Câu hỏi đầu tiên:**\nHãy giới thiệu về bản thân bạn trong 2-3 phút. Tập trung vào kinh nghiệm và điểm mạnh phù hợp với vị trí ${resumeInfo?.jobTitle || 'bạn ứng tuyển'}.\n\n💡 *Gợi ý: Dùng công thức Present-Past-Future*`
            }])
            setQuestionCount(1)
        }
        setIsLoading(false)
    }

    const callAI = async (conversationHistory) => {
        const token = await getToken()
        const resumeContext = buildResumeContext()

        const prompt = INTERVIEW_SYSTEM_PROMPT.replace('{{RESUME_DATA}}', resumeContext) + `

LỊCH SỬ PHỎNG VẤN:
${conversationHistory.map(m => `${m.role === 'user' ? '👤 Ứng viên' : '🎤 Interviewer'}: ${m.content}`).join('\n\n')}

Câu hỏi thứ: ${questionCount + 1}/7

Hãy tiếp tục phỏng vấn. Nếu đã hỏi đủ 7 câu, kết thúc với đánh giá tổng thể.`

        const response = await GlobalApi.AIChat(prompt, token)
        let result = response.data.result || ''
        result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()

        return result
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
            setMessages([...newMessages, { role: 'assistant', content: aiResponse }])
            setQuestionCount(prev => prev + 1)

            // Check if interview is complete (7+ questions)
            if (questionCount >= 6 || aiResponse.includes('đánh giá tổng thể') || aiResponse.includes('kết thúc phỏng vấn')) {
                setIsComplete(true)
            }
        } catch (error) {
            setMessages([...newMessages, {
                role: 'assistant',
                content: '❌ Có lỗi xảy ra. Vui lòng thử lại!'
            }])
        }

        setIsLoading(false)
    }

    const resetInterview = () => {
        setMessages([])
        setQuestionCount(0)
        setIsComplete(false)
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) resetInterview()
        }}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                    <MessageSquare className="w-4 h-4" /> {t('ai.interview.title')}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-4 py-3 border-b bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <DialogTitle className="flex items-center gap-2 text-white">
                        <Mic className="w-5 h-5" />
                        {t('ai.interview.title')}
                        {questionCount > 0 && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                {questionCount}/7 câu
                            </span>
                        )}
                        {isComplete && <CheckCircle className="w-4 h-4 text-green-300" />}
                    </DialogTitle>
                </DialogHeader>

                {messages.length === 0 ? (
                    /* Start Screen */
                    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50">
                        <div className="text-6xl mb-4">🎤</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{t('ai.interview.title')}</h3>
                        <p className="text-gray-600 text-center mb-6 max-w-sm">
                            {t('ai.interview.description')}
                        </p>

                        {resumeInfo?.jobTitle ? (
                            <div className="text-center mb-6">
                                <p className="text-sm text-gray-500">Vị trí phỏng vấn:</p>
                                <p className="font-semibold text-blue-600">{resumeInfo.jobTitle}</p>
                            </div>
                        ) : (
                            <p className="text-sm text-amber-600 mb-6">
                                ⚠️ Hãy hoàn thành CV trước để có trải nghiệm tốt nhất
                            </p>
                        )}

                        <Button
                            onClick={startInterview}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <ArrowRight className="w-4 h-4 mr-2" />
                            )}
                            {t('ai.interview.start')}
                        </Button>
                    </div>
                ) : (
                    /* Chat Interface */
                    <>
                        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[400px] max-h-[500px]">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-br-md'
                                        : 'bg-white border border-gray-200 rounded-bl-md'
                                        }`}>
                                        <div className="text-sm">
                                            {msg.role === 'user' ? (
                                                <div className="whitespace-pre-wrap">{msg.content}</div>
                                            ) : (
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                                                        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                        strong: ({ node, ...props }) => <span className="font-bold text-blue-900" {...props} />,
                                                        h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                                                        h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2" {...props} />,
                                                        h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-2" {...props} />,
                                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-1 my-2 bg-blue-50 rounded text-gray-700 italic" {...props} />,
                                                    }}
                                                >
                                                    {msg.content}
                                                </ReactMarkdown>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border shadow-sm p-3 rounded-2xl rounded-bl-md flex items-center gap-2">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
                                    placeholder={isComplete ? "Phỏng vấn kết thúc! 🎉" : t('ai.interview.yourAnswer')}
                                    disabled={isLoading || isComplete}
                                    className="flex-1 min-h-[44px] max-h-[120px] resize-none"
                                    rows={1}
                                />
                                {isComplete ? (
                                    <Button onClick={resetInterview} size="icon" variant="outline" className="h-11 w-11">
                                        <RefreshCw className="w-4 h-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !inputValue.trim()}
                                        size="icon"
                                        className="h-11 w-11 bg-gradient-to-r from-blue-500 to-cyan-500"
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

export default InterviewPrep
