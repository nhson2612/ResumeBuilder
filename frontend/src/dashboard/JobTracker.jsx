import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Trash2, ExternalLink, GripVertical, Briefcase } from 'lucide-react'
import GlobalApi from '../../service/GlobalApi'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const COLUMNS = [
    { id: 'wishlist', name: 'Wishlist', color: 'bg-gray-100', emoji: '💭' },
    { id: 'applied', name: 'Applied', color: 'bg-blue-100', emoji: '📤' },
    { id: 'interview', name: 'Interview', color: 'bg-yellow-100', emoji: '🎤' },
    { id: 'offer', name: 'Offer', color: 'bg-green-100', emoji: '🎉' },
    { id: 'rejected', name: 'Rejected', color: 'bg-red-100', emoji: '❌' }
]

function JobTracker() {
    const [applications, setApplications] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [newApp, setNewApp] = useState({ company: '', position: '', jobUrl: '', notes: '', status: 'wishlist' })
    const [draggedItem, setDraggedItem] = useState(null)

    const { getToken } = useAuth()
    const { t } = useTranslation()

    useEffect(() => {
        fetchApplications()
    }, [])

    const fetchApplications = async () => {
        try {
            const token = await getToken()
            const response = await GlobalApi.GetJobApplications(token)
            setApplications(response.data.data || [])
        } catch (error) {
            console.error('Error fetching applications:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddApplication = async () => {
        if (!newApp.company || !newApp.position) {
            toast.error('Company and position are required')
            return
        }

        try {
            const token = await getToken()
            await GlobalApi.CreateJobApplication(newApp, token)
            toast.success('Application added!')
            setShowAddDialog(false)
            setNewApp({ company: '', position: '', jobUrl: '', notes: '', status: 'wishlist' })
            fetchApplications()
        } catch (error) {
            toast.error('Failed to add application')
        }
    }

    const handleUpdateStatus = async (appId, newStatus) => {
        try {
            const token = await getToken()
            await GlobalApi.UpdateJobApplication(appId, { status: newStatus }, token)
            setApplications(apps =>
                apps.map(app =>
                    app.applicationId === appId ? { ...app, status: newStatus } : app
                )
            )
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    const handleDelete = async (appId) => {
        try {
            const token = await getToken()
            await GlobalApi.DeleteJobApplication(appId, token)
            setApplications(apps => apps.filter(app => app.applicationId !== appId))
            toast.success('Application deleted')
        } catch (error) {
            toast.error('Failed to delete application')
        }
    }

    // Simple drag and drop
    const handleDragStart = (e, app) => {
        setDraggedItem(app)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'move'
    }

    const handleDrop = (e, columnId) => {
        e.preventDefault()
        if (draggedItem && draggedItem.status !== columnId) {
            handleUpdateStatus(draggedItem.applicationId, columnId)
        }
        setDraggedItem(null)
    }

    const getColumnApps = (columnId) =>
        applications.filter(app => app.status === columnId)

    if (isLoading) {
        return (
            <div className="p-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-purple-500" />
                        {t('jobTracker.title')}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {applications.length} applications tracked
                    </p>
                </div>

                <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                            <Plus className="w-4 h-4" /> {t('jobTracker.addApplication')}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('jobTracker.addApplication')}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <Input
                                placeholder={t('jobTracker.form.company')}
                                value={newApp.company}
                                onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
                            />
                            <Input
                                placeholder={t('jobTracker.form.position')}
                                value={newApp.position}
                                onChange={(e) => setNewApp({ ...newApp, position: e.target.value })}
                            />
                            <Input
                                placeholder={t('jobTracker.form.url')}
                                value={newApp.jobUrl}
                                onChange={(e) => setNewApp({ ...newApp, jobUrl: e.target.value })}
                            />
                            <Textarea
                                placeholder={t('jobTracker.form.notes')}
                                value={newApp.notes}
                                onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
                            />
                            <select
                                className="w-full p-2 border rounded-md"
                                value={newApp.status}
                                onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
                            >
                                {COLUMNS.map(col => (
                                    <option key={col.id} value={col.id}>
                                        {col.emoji} {col.name}
                                    </option>
                                ))}
                            </select>
                            <Button onClick={handleAddApplication} className="w-full">
                                {t('common.create')}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-5 gap-4">
                {COLUMNS.map(column => (
                    <div
                        key={column.id}
                        className={`rounded-lg p-3 min-h-[400px] ${column.color}`}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-700 flex items-center gap-1">
                                <span>{column.emoji}</span>
                                {column.name}
                            </h3>
                            <span className="text-xs bg-white px-2 py-0.5 rounded-full text-gray-500">
                                {getColumnApps(column.id).length}
                            </span>
                        </div>

                        <div className="space-y-2">
                            {getColumnApps(column.id).map(app => (
                                <div
                                    key={app.applicationId}
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, app)}
                                    className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-grab hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-sm text-gray-800">{app.company}</h4>
                                            <p className="text-xs text-gray-500">{app.position}</p>
                                        </div>
                                        <GripVertical className="w-4 h-4 text-gray-300" />
                                    </div>

                                    {app.notes && (
                                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{app.notes}</p>
                                    )}

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                        {app.jobUrl && (
                                            <a
                                                href={app.jobUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleDelete(app.applicationId)}
                                            className="text-red-400 hover:text-red-500 ml-auto"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JobTracker
