import React, { useState, useContext, useRef, useEffect, useCallback } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
    MessageSquare, Send, Loader2, CheckCircle, RefreshCw, Mic, MicOff,
    ArrowRight, Volume2, VolumeX, Settings, History, AlertTriangle,
    Gauge, HelpCircle
} from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

// Dynamic prompt based on settings
const buildInterviewPrompt = (resumeData, difficulty, questionCount, currentQuestion, isFirstQuestion) => {
    const difficultyGuide = {
        easy: 'Câu hỏi behavioral cơ bản, không technical. Ví dụ: "Hãy giới thiệu về bản thân", "Tại sao bạn chọn ngành này?"',
        medium: 'Kết hợp behavioral và technical cơ bản. Ví dụ: "Mô tả dự án bạn tự hào nhất", "Giải thích cách bạn xử lý bug khó?"',
        hard: 'Technical chuyên sâu, system design, live coding. Ví dụ: "Thiết kế hệ thống chat realtime", "Tối ưu query database chậm?"'
    }

    if (isFirstQuestion) {
        return `Bạn là nhà tuyển dụng IT chuyên nghiệp. Bắt đầu phỏng vấn ngay.

THÔNG TIN ỨNG VIÊN:
${resumeData}

ĐỘ KHÓ: ${difficulty.toUpperCase()}
${difficultyGuide[difficulty]}

NHIỆM VỤ: Đặt CÂU HỎI ĐẦU TIÊN trong ${questionCount} câu.

VÍ DỤ OUTPUT TỐT:
---
Xin chào! Tôi là người phỏng vấn hôm nay. Rất vui được gặp bạn!

**Câu hỏi 1/${questionCount}:**
Trước tiên, hãy giới thiệu về bản thân và lý do bạn quan tâm đến vị trí ${resumeData.includes('Frontend') ? 'Frontend Developer' : 'Developer'} này?

💡 *Mẹo: Dùng công thức Present-Past-Future trong 2 phút*
---

BẮT ĐẦU PHỎNG VẤN NGAY. KHÔNG giải thích, KHÔNG hỏi lại.`
    }

    return `Bạn là nhà tuyển dụng IT. Tiếp tục phỏng vấn.

THÔNG TIN ỨNG VIÊN:
${resumeData}

ĐỘ KHÓ: ${difficulty.toUpperCase()} - ${difficultyGuide[difficulty]}

TRẠNG THÁI: Đang ở câu ${currentQuestion}/${questionCount}

NHIỆM VỤ:
1. ĐÁNH GIÁ câu trả lời vừa rồi (dùng [EVALUATION: good], [EVALUATION: needs_improvement], hoặc [EVALUATION: weak])
2. Đưa feedback ngắn gọn  
3. Đặt CÂU HỎI TIẾP THEO (hoặc tổng kết nếu đã hết ${questionCount} câu)

VÍ DỤ OUTPUT TỐT:
---
**[EVALUATION: good]**
✅ Câu trả lời rõ ràng, có cấu trúc tốt. Bạn đã nêu được thành tựu cụ thể.

**Câu hỏi ${currentQuestion}/${questionCount}:**
Trong dự án ABC bạn vừa đề cập, bạn đã gặp thách thức kỹ thuật nào khó nhất và giải quyết như thế nào?

💡 *Mẹo: Dùng phương pháp STAR - Situation, Task, Action, Result*
---

${currentQuestion >= questionCount ? `
NẾU ĐÂY LÀ CÂU CUỐI, thay vì đặt câu hỏi mới, hãy:
- Tổng kết điểm mạnh/yếu
- Đánh giá tổng thể (X/10)
- Đề xuất cải thiện
` : ''}

TRẢ LỜI NGAY. Đừng giải thích format, đừng hỏi lại, đừng dùng placeholder.`
}

// Speech Recognition Hook
const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState('')
    const [isSupported, setIsSupported] = useState(false)
    const recognitionRef = useRef(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
            if (SpeechRecognition) {
                setIsSupported(true)
                recognitionRef.current = new SpeechRecognition()
                recognitionRef.current.continuous = true
                recognitionRef.current.interimResults = true
                recognitionRef.current.lang = 'vi-VN'

                recognitionRef.current.onresult = (event) => {
                    let finalTranscript = ''
                    for (let i = event.resultIndex; i < event.results.length; i++) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript
                        }
                    }
                    if (finalTranscript) {
                        setTranscript(prev => prev + ' ' + finalTranscript)
                    }
                }

                recognitionRef.current.onerror = (event) => {
                    console.error('Speech recognition error:', event.error)
                    setIsListening(false)
                    // Store error for component to handle
                    if (event.error === 'network' || event.error === 'not-allowed') {
                        recognitionRef.current.lastError = event.error
                    }
                }

                recognitionRef.current.onend = () => {
                    setIsListening(false)
                }
            }
        }
    }, [])

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setTranscript('')
            recognitionRef.current.start()
            setIsListening(true)
        }
    }, [isListening])

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        }
    }, [isListening])

    return { isListening, transcript, isSupported, startListening, stopListening, setTranscript }
}

// Text-to-Speech Hook
const useSpeechSynthesis = () => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isEnabled, setIsEnabled] = useState(true)
    const [availableVoices, setAvailableVoices] = useState([])
    const utteranceRef = useRef(null)

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis?.getVoices() || []
            setAvailableVoices(voices)
            console.log('Available TTS voices:', voices.map(v => `${v.name} (${v.lang})`))
        }

        if ('speechSynthesis' in window) {
            loadVoices()
            // Some browsers load voices async
            window.speechSynthesis.onvoiceschanged = loadVoices
        }
    }, [])

    // Get best voice (prefer Vietnamese, fallback to English)
    const getBestVoice = useCallback(() => {
        if (availableVoices.length === 0) return null

        // Try Vietnamese first
        const viVoice = availableVoices.find(v => v.lang.startsWith('vi'))
        if (viVoice) return viVoice

        // Fallback to English
        const enVoice = availableVoices.find(v => v.lang.startsWith('en'))
        if (enVoice) return enVoice

        // Use default
        return availableVoices[0]
    }, [availableVoices])

    const speak = useCallback((text) => {
        if (!isEnabled || !('speechSynthesis' in window)) {
            console.log('TTS disabled or not supported')
            return
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel()

        // Clean markdown from text
        const cleanText = text
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/#{1,6}\s/g, '')
            .replace(/\[EVALUATION:.*?\]/g, '')
            .replace(/💡/g, '')
            .replace(/✅|⚠️|❌/g, '')
            .trim()

        if (!cleanText) {
            console.log('No text to speak')
            return
        }

        console.log('Speaking:', cleanText.substring(0, 100) + '...')

        utteranceRef.current = new SpeechSynthesisUtterance(cleanText)

        // Set voice
        const voice = getBestVoice()
        if (voice) {
            utteranceRef.current.voice = voice
            utteranceRef.current.lang = voice.lang
            console.log('Using voice:', voice.name)
        } else {
            utteranceRef.current.lang = 'vi-VN'
        }

        utteranceRef.current.rate = 0.9
        utteranceRef.current.pitch = 1.0
        utteranceRef.current.volume = 1.0

        utteranceRef.current.onstart = () => {
            console.log('TTS started')
            setIsSpeaking(true)
        }
        utteranceRef.current.onend = () => {
            console.log('TTS ended')
            setIsSpeaking(false)
        }
        utteranceRef.current.onerror = (e) => {
            console.error('TTS error:', e)
            setIsSpeaking(false)
        }

        window.speechSynthesis.speak(utteranceRef.current)
    }, [isEnabled, getBestVoice])

    const stopSpeaking = useCallback(() => {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
    }, [])

    // Test function to verify TTS works
    const testSpeak = useCallback(() => {
        if (!('speechSynthesis' in window)) {
            console.log('Speech Synthesis not supported')
            return false
        }

        window.speechSynthesis.cancel()
        const testUtterance = new SpeechSynthesisUtterance('Xin chào, tôi là trợ lý phỏng vấn AI')
        const voice = getBestVoice()
        if (voice) {
            testUtterance.voice = voice
            testUtterance.lang = voice.lang
        }
        testUtterance.volume = 1.0
        window.speechSynthesis.speak(testUtterance)
        return true
    }, [getBestVoice])

    return { isSpeaking, isEnabled, setIsEnabled, speak, stopSpeaking, testSpeak, availableVoices }
}

function InterviewPrep() {
    // UI State
    const [open, setOpen] = useState(false)
    const [showSettings, setShowSettings] = useState(true)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [questionCount, setQuestionCount] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const chatEndRef = useRef(null)

    // Settings
    const [settings, setSettings] = useState({
        questionCount: 5,
        difficulty: 'medium',
        voiceEnabled: false
    })

    // Session tracking
    const [sessionId, setSessionId] = useState(null)
    const [sessionScore, setSessionScore] = useState({ good: 0, needsImprovement: 0, weak: 0 })

    // Hooks
    const { resumeInfo } = useContext(ResumeInfoContext)
    const { resumeId } = useParams()
    const { getToken } = useAuth()
    const { t } = useTranslation()
    const { isListening, transcript, isSupported, startListening, stopListening, setTranscript } = useSpeechRecognition()
    const { isSpeaking, isEnabled: ttsEnabled, setIsEnabled: setTtsEnabled, speak, stopSpeaking, testSpeak } = useSpeechSynthesis()

    // Auto-scroll chat
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Update input when voice transcript changes
    useEffect(() => {
        if (transcript.trim()) {
            setInputValue(prev => prev + transcript)
            setTranscript('')
        }
    }, [transcript, setTranscript])

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

    // Parse evaluation from AI response
    const parseEvaluation = (response) => {
        const evalMatch = response.match(/\[EVALUATION:\s*(good|needs_improvement|weak)\]/i)
        return evalMatch ? evalMatch[1].toLowerCase() : null
    }

    const startInterview = async () => {
        setIsLoading(true)
        setIsComplete(false)
        setQuestionCount(1)
        setShowSettings(false)
        setSessionScore({ good: 0, needsImprovement: 0, weak: 0 })

        try {
            // Create session in backend
            const token = await getToken()
            const sessionResponse = await GlobalApi.CreateInterviewSession({
                resumeId,
                questionCount: settings.questionCount,
                difficulty: settings.difficulty,
                voiceEnabled: settings.voiceEnabled
            }, token)
            setSessionId(sessionResponse.data.data.sessionId)

            // Get first question from AI
            const response = await callAI([], 1, true)

            setMessages([{ role: 'assistant', content: response }])

            // Speak first question if voice enabled
            if (settings.voiceEnabled && ttsEnabled) {
                speak(response)
            }
        } catch (error) {
            console.error('Error starting interview:', error)
            setMessages([{
                role: 'assistant',
                content: `Xin chào **${resumeInfo?.firstName || 'bạn'}**! 👋\n\nTôi là nhà tuyển dụng hôm nay.\n\n**Câu hỏi 1/${settings.questionCount}:**\nHãy giới thiệu về bản thân bạn trong 2-3 phút.\n\n💡 *Gợi ý: Dùng công thức Present-Past-Future*`
            }])
        }
        setIsLoading(false)
    }

    const callAI = async (conversationHistory, currentQ, isFirstQuestion = false) => {
        const token = await getToken()
        const resumeContext = buildResumeContext()

        let prompt = buildInterviewPrompt(
            resumeContext,
            settings.difficulty,
            settings.questionCount,
            currentQ,
            isFirstQuestion
        )

        // Add conversation history for follow-up questions
        if (!isFirstQuestion && conversationHistory.length > 0) {
            const lastUserMessage = conversationHistory.filter(m => m.role === 'user').pop()
            const lastAIMessage = conversationHistory.filter(m => m.role === 'assistant').pop()

            prompt += `

CÂU HỎI TRƯỚC ĐÓ:
${lastAIMessage?.content?.substring(0, 500) || 'N/A'}

CÂU TRẢ LỜI CỦA ỨNG VIÊN:
${lastUserMessage?.content || 'N/A'}

HÃY ĐÁNH GIÁ CÂU TRẢ LỜI TRÊN VÀ ĐẶT CÂU HỎI TIẾP THEO.`
        }

        const response = await GlobalApi.AIChat(prompt, token)
        let result = response.data.result || ''
        result = result.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()

        return result
    }

    const handleSendMessage = async () => {
        if (!inputValue.trim() || isLoading) return

        // Stop any ongoing speech
        stopSpeaking()
        if (isListening) stopListening()

        const userMessage = { role: 'user', content: inputValue }
        const newMessages = [...messages, userMessage]
        setMessages(newMessages)
        setInputValue('')
        setIsLoading(true)

        const nextQuestion = questionCount + 1

        try {
            const aiResponse = await callAI(newMessages, nextQuestion)
            setMessages([...newMessages, { role: 'assistant', content: aiResponse }])
            setQuestionCount(nextQuestion)

            // Parse and track evaluation
            const evaluation = parseEvaluation(aiResponse)
            if (evaluation) {
                setSessionScore(prev => ({
                    ...prev,
                    [evaluation === 'needs_improvement' ? 'needsImprovement' : evaluation]: prev[evaluation === 'needs_improvement' ? 'needsImprovement' : evaluation] + 1
                }))

                // Save question to backend
                if (sessionId) {
                    const token = await getToken()
                    await GlobalApi.SaveInterviewQuestion(sessionId, {
                        questionNumber: questionCount,
                        question: messages[messages.length - 1]?.content || '',
                        userAnswer: inputValue,
                        evaluation,
                        aiFeedback: aiResponse
                    }, token)
                }
            }

            // Check if complete
            if (nextQuestion > settings.questionCount ||
                aiResponse.includes('đánh giá tổng thể') ||
                aiResponse.includes('kết thúc phỏng vấn')) {
                setIsComplete(true)

                // Complete session in backend
                if (sessionId) {
                    const token = await getToken()
                    const totalScore = Math.round((sessionScore.good / settings.questionCount) * 100)
                    await GlobalApi.CompleteInterviewSession(sessionId, { totalScore }, token)
                }
            }

            // Speak response if voice enabled
            if (settings.voiceEnabled && ttsEnabled) {
                speak(aiResponse)
            }
        } catch (error) {
            console.error('Error in interview:', error)
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
        setShowSettings(true)
        setSessionId(null)
        setSessionScore({ good: 0, needsImprovement: 0, weak: 0 })
        stopSpeaking()
    }

    const handleVoiceToggle = () => {
        if (isListening) {
            stopListening()
        } else {
            startListening()
            // Check for errors after a short delay
            setTimeout(() => {
                if (!isListening) {
                    toast.error('Lỗi nhận diện giọng nói. Vui lòng kiểm tra: 1) Kết nối internet 2) Quyền microphone 3) Sử dụng HTTPS')
                }
            }, 1000)
        }
    }

    // Settings Screen
    const renderSettings = () => (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="text-5xl mb-4">🎤</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t('ai.interview.title')}</h3>
            <p className="text-gray-600 text-center mb-6 max-w-sm text-sm">
                {t('ai.interview.description')}
            </p>

            {resumeInfo?.jobTitle && (
                <div className="text-center mb-4 p-3 bg-white rounded-lg shadow-sm">
                    <p className="text-xs text-gray-500">Vị trí phỏng vấn:</p>
                    <p className="font-semibold text-blue-600">{resumeInfo.jobTitle}</p>
                </div>
            )}

            {/* Settings */}
            <div className="w-full max-w-xs space-y-4 mb-6">
                {/* Question Count */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">Số câu hỏi</span>
                        <span className="ml-auto text-blue-600 font-bold">{settings.questionCount}</span>
                    </div>
                    <input
                        type="range"
                        min="3"
                        max="10"
                        value={settings.questionCount}
                        onChange={(e) => setSettings(s => ({ ...s, questionCount: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>3</span>
                        <span>10</span>
                    </div>
                </div>

                {/* Difficulty */}
                <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                        <Gauge className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium">Độ khó</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { id: 'easy', label: 'Dễ', emoji: '🌱' },
                            { id: 'medium', label: 'Trung bình', emoji: '🌿' },
                            { id: 'hard', label: 'Khó', emoji: '🌳' }
                        ].map(level => (
                            <button
                                key={level.id}
                                onClick={() => setSettings(s => ({ ...s, difficulty: level.id }))}
                                className={`p-2 rounded-lg text-xs font-medium transition-all ${settings.difficulty === level.id
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <span className="block text-base mb-0.5">{level.emoji}</span>
                                {level.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Voice Mode */}
                {isSupported && (
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Mic className="w-4 h-4 text-gray-400" />
                                <span className="text-sm font-medium">Chế độ giọng nói</span>
                            </div>
                            <button
                                onClick={() => setSettings(s => ({ ...s, voiceEnabled: !s.voiceEnabled }))}
                                className={`relative w-12 h-6 rounded-full transition-colors ${settings.voiceEnabled ? 'bg-blue-500' : 'bg-gray-300'
                                    }`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${settings.voiceEnabled ? 'translate-x-6' : ''
                                    }`} />
                            </button>
                        </div>
                        {settings.voiceEnabled && (
                            <p className="text-xs text-gray-500 mt-2">
                                🎙️ Nói để trả lời, AI sẽ đọc câu hỏi
                            </p>
                        )}
                    </div>
                )}
            </div>

            <Button
                onClick={startInterview}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6"
            >
                {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {t('ai.interview.start')}
            </Button>
        </div>
    )

    // Chat Interface
    const renderChat = () => (
        <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 min-h-[350px] max-h-[450px]">
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
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t bg-white">
                {/* Score indicator */}
                {(sessionScore.good > 0 || sessionScore.needsImprovement > 0 || sessionScore.weak > 0) && (
                    <div className="flex gap-2 mb-2 text-xs">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                            ✅ {sessionScore.good}
                        </span>
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full">
                            ⚠️ {sessionScore.needsImprovement}
                        </span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                            ❌ {sessionScore.weak}
                        </span>
                    </div>
                )}

                <div className="flex gap-2">
                    {/* Voice controls */}
                    {settings.voiceEnabled && isSupported && (
                        <>
                            <Button
                                onClick={handleVoiceToggle}
                                size="icon"
                                variant={isListening ? "destructive" : "outline"}
                                className="h-11 w-11"
                                disabled={isLoading}
                            >
                                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                            </Button>
                            <Button
                                onClick={() => {
                                    const newValue = !ttsEnabled
                                    setTtsEnabled(newValue)
                                    if (newValue) {
                                        toast('🔊 Đã bật đọc câu hỏi')
                                        // Play test sound to confirm it works
                                        setTimeout(() => testSpeak(), 500)
                                    } else {
                                        toast('🔇 Đã tắt đọc câu hỏi')
                                        stopSpeaking()
                                    }
                                }}
                                size="icon"
                                variant={ttsEnabled ? "default" : "outline"}
                                className={`h-11 w-11 ${ttsEnabled ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                            >
                                {isSpeaking ? (
                                    <Volume2 className="w-4 h-4 animate-pulse" />
                                ) : ttsEnabled ? (
                                    <Volume2 className="w-4 h-4" />
                                ) : (
                                    <VolumeX className="w-4 h-4" />
                                )}
                            </Button>
                        </>
                    )}

                    <Textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                            }
                        }}
                        placeholder={
                            isComplete ? "Phỏng vấn kết thúc! 🎉" :
                                isListening ? "🎙️ Đang nghe..." :
                                    t('ai.interview.yourAnswer')
                        }
                        disabled={isLoading || isComplete}
                        className={`flex-1 min-h-[44px] max-h-[120px] resize-none ${isListening ? 'border-red-500 bg-red-50' : ''
                            }`}
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
    )

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
                        {!showSettings && questionCount > 0 && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                                {questionCount}/{settings.questionCount}
                            </span>
                        )}
                        {settings.voiceEnabled && !showSettings && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                                {isSpeaking ? <Volume2 className="w-3 h-3 animate-pulse" /> : <Mic className="w-3 h-3" />}
                                Voice
                            </span>
                        )}
                        {isComplete && <CheckCircle className="w-4 h-4 text-green-300" />}
                    </DialogTitle>
                </DialogHeader>

                {showSettings ? renderSettings() : renderChat()}
            </DialogContent>
        </Dialog>
    )
}

export default InterviewPrep
