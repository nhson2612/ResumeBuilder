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
import { Plus, Trash2, MoreVertical } from 'lucide-react'
import GlobalApi from '../../service/GlobalApi'
import { useAuth } from '@clerk/clerk-react'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

const COLUMNS = [
    {
        id: 'wishlist',
        name: 'Wishlist',
        headerBg: 'bg-slate-800 dark:bg-black',
        headerBorder: 'border-slate-500',
        textColor: 'text-white'
    },
    {
        id: 'applied',
        name: 'Applied',
        headerBg: 'bg-blue-900 dark:bg-[#1a2333]',
        headerBorder: 'border-blue-500',
        textColor: 'text-white'
    },
    {
        id: 'interview',
        name: 'Interview',
        headerBg: 'bg-amber-600 dark:bg-[#4d3300]',
        headerBorder: 'border-amber-500',
        textColor: 'text-white'
    },
    {
        id: 'offer',
        name: 'Offer',
        headerBg: 'bg-emerald-800 dark:bg-[#062e1e]',
        headerBorder: 'border-emerald-500',
        textColor: 'text-white'
    },
    {
        id: 'rejected',
        name: 'Reject',
        headerBg: 'bg-red-900 dark:bg-[#330c0c]',
        headerBorder: 'border-red-500',
        textColor: 'text-white'
    }
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

    // Drag and Drop handlers
    const handleDragStart = (e, app) => {
        setDraggedItem(app)
        e.dataTransfer.effectAllowed = 'move'
        // Add a slight transparency to the dragged element
        e.target.style.opacity = '0.5'
    }

    const handleDragEnd = (e) => {
        e.target.style.opacity = '1'
        setDraggedItem(null)
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
    }

    const getColumnApps = (columnId) =>
        applications.filter(app => app.status === columnId)

    // Calculate stats
    const totalApps = applications.length;
    const interviewCount = applications.filter(a => a.status === 'interview').length;
    const successRate = totalApps > 0
        ? ((applications.filter(a => a.status === 'offer').length / totalApps) * 100).toFixed(1)
        : 0;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col">
            <main className="flex h-[calc(100vh-65px)]">
                {/* Main Content Area */}
                <section className="flex-1 flex flex-col overflow-hidden">
                    {/* Section Header & Actions */}
                    <div className="px-8 py-6 flex justify-between items-end border-b border-slate-200 dark:border-border-dark bg-white dark:bg-[#121212]">
                        <div>
                            <h1 className="text-3xl font-bold uppercase tracking-tighter text-slate-900 dark:text-white">Pro Management Board</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 uppercase tracking-widest font-medium">
                                Developer Pipeline / {new Date().getFullYear()}
                            </p>
                        </div>

                        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
                            <DialogTrigger asChild>
                                <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all">
                                    <Plus className="w-5 h-5" />
                                    Add New Application
                                </button>
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
                                                {col.name}
                                            </option>
                                        ))}
                                    </select>
                                    <Button onClick={handleAddApplication} className="w-full bg-primary hover:bg-primary/90">
                                        {t('common.create')}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Kanban Board Wrapper */}
                    <div className="flex-1 overflow-x-auto p-8 bg-slate-50 dark:bg-[#0a0a0a]">
                        <div className="flex gap-6 h-full min-w-[1200px]">
                            {COLUMNS.map(column => {
                                const apps = getColumnApps(column.id);
                                return (
                                    <div key={column.id} className="flex-1 flex flex-col min-w-[280px]">
                                        <div className={`${column.headerBg} p-3 border-l-4 ${column.headerBorder} flex justify-between items-center mb-4`}>
                                            <h3 className={`${column.textColor} text-xs font-bold uppercase tracking-widest`}>
                                                {column.name} ({apps.length})
                                            </h3>
                                            <MoreVertical className="w-4 h-4 text-slate-500" />
                                        </div>

                                        <div
                                            className="flex flex-col gap-4 kanban-column overflow-y-auto pr-2 h-full"
                                            onDragOver={handleDragOver}
                                            onDrop={(e) => handleDrop(e, column.id)}
                                        >
                                            {apps.map(app => (
                                                <div
                                                    key={app.applicationId}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, app)}
                                                    onDragEnd={handleDragEnd}
                                                    className="bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark p-4 group hover:border-primary transition-colors cursor-grab"
                                                >
                                                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">
                                                        {new Date(app.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                    </p>
                                                    <h4 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                                        {app.company}
                                                    </h4>
                                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                                        {app.position}
                                                    </p>
                                                    {app.notes && (
                                                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-3 line-clamp-2">
                                                            {app.notes}
                                                        </p>
                                                    )}
                                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-border-dark flex justify-between items-center">
                                                        <div className="flex gap-3">
                                                            {app.jobUrl && (
                                                                <a href={app.jobUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors">
                                                                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                                                                </a>
                                                            )}
                                                            <button
                                                                onClick={() => handleDelete(app.applicationId)}
                                                                className="text-slate-400 hover:text-red-500 transition-colors"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                                                            ID: {app.applicationId?.toString().slice(-4)}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                            {apps.length === 0 && (
                                                <div className="border-2 border-dashed border-slate-200 dark:border-border-dark rounded p-4 text-center">
                                                    <p className="text-xs text-slate-400 uppercase font-bold">Empty</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating Action Info */}
            <div className="fixed bottom-6 right-8 bg-black border border-border-dark p-4 flex gap-6 items-center shadow-2xl hidden lg:flex z-50">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Success Rate</span>
                    <span className="text-xl font-bold text-primary tracking-tighter">{successRate}%</span>
                </div>
                <div className="w-px h-8 bg-border-dark"></div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Apps</span>
                    <span className="text-xl font-bold text-white tracking-tighter">{totalApps}</span>
                </div>
                <div className="w-px h-8 bg-border-dark"></div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Interviews</span>
                    <span className="text-xl font-bold text-amber-500 tracking-tighter">{interviewCount}</span>
                </div>
            </div>
        </div>
    )
}

export default JobTracker