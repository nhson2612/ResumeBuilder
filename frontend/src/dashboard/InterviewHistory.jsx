import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    History, Trash2, ChevronRight, AlertTriangle, CheckCircle,
    Clock, Target, RefreshCw, Loader2
} from 'lucide-react'
import GlobalApi from '../../service/GlobalApi'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'

function InterviewHistory() {
    const [sessions, setSessions] = useState([])
    const [weakQuestions, setWeakQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('history') // history, weak
    const [expandedSession, setExpandedSession] = useState(null)
    const [sessionDetails, setSessionDetails] = useState(null)

    const { getToken } = useAuth()
    const { t } = useTranslation()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const token = await getToken()
            const [sessionsRes, weakRes] = await Promise.all([
                GlobalApi.GetInterviewSessions(token),
                GlobalApi.GetWeakQuestions(token)
            ])
            setSessions(sessionsRes.data.data || [])
            setWeakQuestions(weakRes.data.data || [])
        } catch (error) {
            console.error('Error fetching interview data:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchSessionDetails = async (sessionId) => {
        try {
            const token = await getToken()
            const response = await GlobalApi.GetInterviewSessionDetails(sessionId, token)
            setSessionDetails(response.data.data)
            setExpandedSession(sessionId)
        } catch (error) {
            toast.error('Failed to load session details')
        }
    }

    const handleDeleteSession = async (sessionId) => {
        try {
            const token = await getToken()
            await GlobalApi.DeleteInterviewSession(sessionId, token)
            setSessions(sessions.filter(s => s.sessionId !== sessionId))
            toast.success('Session deleted')
            if (expandedSession === sessionId) {
                setExpandedSession(null)
                setSessionDetails(null)
            }
        } catch (error) {
            toast.error('Failed to delete session')
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getDifficultyBadge = (difficulty) => {
        const styles = {
            easy: 'bg-green-100 text-green-700',
            medium: 'bg-yellow-100 text-yellow-700',
            hard: 'bg-red-100 text-red-700'
        }
        const labels = { easy: 'Dễ', medium: 'Trung bình', hard: 'Khó' }
        return (
            <span className={`text-xs px-2 py-0.5 rounded-full ${styles[difficulty]}`}>
                {labels[difficulty]}
            </span>
        )
    }

    const getEvaluationIcon = (evaluation) => {
        switch (evaluation) {
            case 'good':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'needs_improvement':
                return <AlertTriangle className="w-4 h-4 text-yellow-500" />
            case 'weak':
                return <AlertTriangle className="w-4 h-4 text-red-500" />
            default:
                return null
        }
    }

    // Helper to safely convert to string for ReactMarkdown
    const safeString = (value) => {
        if (typeof value === 'string') return value
        if (value === null || value === undefined) return ''
        return String(value)
    }

    if (isLoading) {
        return (
            <div className="p-10 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <History className="w-6 h-6 text-blue-500" />
                        Lịch sử phỏng vấn
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {sessions.length} buổi phỏng vấn • {weakQuestions.length} câu cần ôn tập
                    </p>
                </div>
                <Button onClick={fetchData} variant="outline" size="sm" className="gap-2">
                    <RefreshCw className="w-4 h-4" /> Làm mới
                </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'history'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    📋 Lịch sử ({sessions.length})
                </button>
                <button
                    onClick={() => setActiveTab('weak')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${activeTab === 'weak'
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    ⚠️ Câu cần ôn ({weakQuestions.length})
                </button>
            </div>

            {/* Content */}
            {activeTab === 'history' ? (
                <div className="space-y-4">
                    {sessions.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Chưa có buổi phỏng vấn nào</p>
                            <p className="text-sm text-gray-400">Bắt đầu phỏng vấn thử từ trang CV của bạn</p>
                        </div>
                    ) : (
                        sessions.map(session => (
                            <div key={session.sessionId} className="bg-white rounded-xl border shadow-sm overflow-hidden">
                                {/* Session Header */}
                                <div
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                                    onClick={() => {
                                        if (expandedSession === session.sessionId) {
                                            setExpandedSession(null)
                                            setSessionDetails(null)
                                        } else {
                                            fetchSessionDetails(session.sessionId)
                                        }
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${session.status === 'completed'
                                            ? 'bg-green-100'
                                            : 'bg-yellow-100'
                                            }`}>
                                            {session.status === 'completed'
                                                ? <CheckCircle className="w-6 h-6 text-green-600" />
                                                : <Clock className="w-6 h-6 text-yellow-600" />
                                            }
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-gray-800">
                                                    {session.questionCount} câu hỏi
                                                </span>
                                                {getDifficultyBadge(session.difficulty)}
                                                {session.voiceEnabled && (
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                                        🎙️ Voice
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {formatDate(session.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Stats */}
                                        {session.stats && (
                                            <div className="flex gap-2 text-xs">
                                                <span className="px-2 py-1 bg-green-50 text-green-600 rounded">
                                                    ✅ {session.stats.good}
                                                </span>
                                                <span className="px-2 py-1 bg-red-50 text-red-600 rounded">
                                                    ❌ {session.stats.weak}
                                                </span>
                                            </div>
                                        )}
                                        {session.totalScore && (
                                            <div className="text-right">
                                                <span className="text-2xl font-bold text-blue-600">
                                                    {session.totalScore}
                                                </span>
                                                <span className="text-sm text-gray-400">/100</span>
                                            </div>
                                        )}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteSession(session.sessionId)
                                            }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${expandedSession === session.sessionId ? 'rotate-90' : ''
                                            }`} />
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedSession === session.sessionId && sessionDetails && (
                                    <div className="border-t bg-gray-50 p-4">
                                        <h4 className="font-semibold text-gray-700 mb-3">Chi tiết câu hỏi:</h4>
                                        <div className="space-y-3">
                                            {sessionDetails.questions.map((q, idx) => (
                                                <div key={q.questionId} className="bg-white p-3 rounded-lg border">
                                                    <div className="flex items-start gap-2">
                                                        {getEvaluationIcon(q.evaluation)}
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-gray-700">
                                                                Câu {q.questionNumber}:
                                                            </p>
                                                            <div className="text-sm text-gray-600 mt-1">
                                                                <ReactMarkdown
                                                                    components={{
                                                                        p: ({ node, ...props }) => <p className="mb-1" {...props} />,
                                                                        strong: ({ node, ...props }) => <span className="font-semibold" {...props} />,
                                                                    }}
                                                                >
                                                                    {safeString(q.question)}
                                                                </ReactMarkdown>
                                                            </div>
                                                            {q.userAnswer && (
                                                                <div className="mt-2 p-2 bg-blue-50 rounded text-sm">
                                                                    <span className="font-medium">Trả lời:</span> {safeString(q.userAnswer).substring(0, 150)}...
                                                                </div>
                                                            )}
                                                            {q.aiFeedback && (
                                                                <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                                                                    <span className="font-medium text-green-700">Góp ý:</span>
                                                                    <div className="mt-1 text-gray-600">
                                                                        <ReactMarkdown
                                                                            components={{
                                                                                p: ({ node, ...props }) => <p className="mb-1" {...props} />,
                                                                                strong: ({ node, ...props }) => <span className="font-semibold" {...props} />,
                                                                            }}
                                                                        >
                                                                            {safeString(q.aiFeedback)}
                                                                        </ReactMarkdown>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            ) : (
                /* Weak Questions Tab */
                <div className="space-y-4">
                    {weakQuestions.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Không có câu hỏi nào cần ôn tập</p>
                            <p className="text-sm text-gray-400">Tuyệt vời! Bạn đang làm rất tốt</p>
                        </div>
                    ) : (
                        weakQuestions.map((q, idx) => (
                            <div key={q.questionId} className="bg-white rounded-xl border shadow-sm p-4">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${q.evaluation === 'weak' ? 'bg-red-100' : 'bg-yellow-100'
                                        }`}>
                                        <AlertTriangle className={`w-4 h-4 ${q.evaluation === 'weak' ? 'text-red-600' : 'text-yellow-600'
                                            }`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {getDifficultyBadge(q.session?.difficulty || 'medium')}
                                            <span className="text-xs text-gray-400">
                                                {formatDate(q.createdAt)}
                                            </span>
                                        </div>
                                        <div className="text-sm font-medium text-gray-800 mb-2">
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ node, ...props }) => <p className="mb-1" {...props} />,
                                                    strong: ({ node, ...props }) => <span className="font-semibold" {...props} />,
                                                }}
                                            >
                                                {safeString(q.question)}
                                            </ReactMarkdown>
                                        </div>
                                        {q.userAnswer && (
                                            <div className="mb-2 p-2 bg-red-50 rounded text-sm text-gray-600">
                                                <span className="font-medium text-red-600">Câu trả lời của bạn:</span>
                                                <p className="mt-1">{safeString(q.userAnswer)}</p>
                                            </div>
                                        )}
                                        {q.aiFeedback && (
                                            <div className="p-2 bg-blue-50 rounded text-sm">
                                                <span className="font-medium text-blue-600">Góp ý:</span>
                                                <div className="mt-1 text-gray-600">
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({ node, ...props }) => <p className="mb-1" {...props} />,
                                                            strong: ({ node, ...props }) => <span className="font-semibold" {...props} />,
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2" {...props} />,
                                                            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
                                                        }}
                                                    >
                                                        {safeString(q.aiFeedback)}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

export default InterviewHistory
