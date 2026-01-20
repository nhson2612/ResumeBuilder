import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useAuth, useUser, UserButton } from '@clerk/clerk-react';
import ThemeColor from '../../components/ThemeColor';
import TemplateSelector from '../../components/TemplateSelector';

function EditResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    GetResumeInfo();
  }, [])

  const GetResumeInfo = async () => {
    const token = await getToken();
    GlobalApi.GetResumeById(resumeId, token).then(resp => {
      setResumeInfo(resp.data.data);
    })
  }

  const handleNext = () => {
    setActiveFormIndex(prev => prev + 1);
  }

  const handleBack = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(prev => prev - 1);
    }
  }

  const progressPercent = Math.min(100, Math.round((activeFormIndex / 7) * 100));

  const formTitles = [
    "Personal Info", "Summary", "Experience", "Education", "Skills", "Projects", "Certifications"
  ];

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="bg-background-light dark:bg-background-dark text-[#1d0f0c] dark:text-[#fcf9f8] min-h-screen flex flex-col font-display overflow-hidden">
        
        {/* Top Navigation */}
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#ead2cd] dark:border-[#3d2a26] bg-background-light dark:bg-background-dark px-6 py-3 z-20">
            <Link to="/dashboard" className="flex items-center gap-4 text-[#1d0f0c] dark:text-[#fcf9f8]">
                <div className="size-6 text-primary">
                    <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"></path>
                    </svg>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-tight uppercase italic">AiCV Builder</h2>
            </Link>
            <div className="flex flex-1 justify-end gap-8">
                <nav className="hidden md:flex items-center gap-9">
                    <Link className="text-sm font-medium hover:text-primary transition-colors" to="/dashboard">Dashboard</Link>
                    <span className="text-primary text-sm font-bold">Editor</span>
                    <Link className="text-sm font-medium hover:text-primary transition-colors" to="/dashboard/jobs">Jobs</Link>
                    <Link className="text-sm font-medium hover:text-primary transition-colors" to="/dashboard/interviews">Interviews</Link>
                </nav>
                <div className="flex gap-3 border-l border-[#ead2cd] dark:border-[#3d2a26] pl-8 items-center">
                    <button className="flex items-center justify-center size-10 bg-white dark:bg-black border border-[#ead2cd] dark:border-[#3d2a26] hover:bg-primary/10 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[20px]">notifications</span>
                    </button>
                    <UserButton />
                </div>
            </div>
        </header>

        {/* Action Bar */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-[#ead2cd] dark:border-[#3d2a26] bg-white dark:bg-[#1d0f0c] z-10">
            <div className="flex gap-2">
                <ThemeColor />
                <TemplateSelector />
            </div>
            <Link to="/dashboard/interviews">
                <button className="flex items-center gap-2 px-6 h-10 bg-primary text-white text-sm font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all rounded-sm">
                    <span className="material-symbols-outlined text-[20px] fill-[1]">mic</span>
                    <span>Start Mock Interview</span>
                </button>
            </Link>
        </div>

        {/* Main Workspace */}
        <main className="flex flex-1 overflow-hidden">
            {/* Left Column: Form Editor */}
            <div className="w-full md:w-[45%] flex flex-col bg-white dark:bg-[#150a08] border-r border-[#ead2cd] dark:border-[#3d2a26]">
                {/* Progress Stepper */}
                <div className="p-6 border-b border-[#ead2cd] dark:border-[#3d2a26]">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Stage 0{activeFormIndex} / 07</span>
                            <span className="text-sm font-bold">{progressPercent}% Complete</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#ead2cd] dark:bg-[#3d2a26] rounded-full overflow-hidden">
                            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter opacity-60">
                            <span className="text-primary">{formTitles[activeFormIndex-1]}</span>
                            {activeFormIndex < 7 && <span>{formTitles[activeFormIndex]}</span>}
                        </div>
                    </div>
                </div>
                
                {/* Scrollable Form Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-8">
                     <FormSection activeFormIndex={activeFormIndex} onEnableNext={setEnableNext} />
                </div>
                
                {/* Sticky Form Footer */}
                <div className="p-6 border-t border-[#ead2cd] dark:border-[#3d2a26] bg-white dark:bg-[#150a08] flex justify-between gap-4">
                    <button 
                        onClick={handleBack}
                        disabled={activeFormIndex <= 1}
                        className={`px-8 h-12 border border-[#ead2cd] dark:border-[#3d2a26] font-bold uppercase tracking-widest hover:bg-background-light dark:hover:bg-background-dark transition-colors rounded-sm ${activeFormIndex <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Back
                    </button>
                    <button 
                        onClick={handleNext}
                        disabled={!enableNext}
                        className={`flex-1 bg-primary text-white font-bold uppercase tracking-widest h-12 hover:brightness-110 flex items-center justify-center gap-2 transition-all rounded-sm ${!enableNext ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Save &amp; Next Section
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="hidden md:flex flex-1 grid-bg flex-col items-center overflow-y-auto custom-scrollbar p-12 bg-background-light dark:bg-background-dark">
                <div className="w-full max-w-[800px] min-h-[1131px] flex flex-col">
                    <ResumePreview />
                </div>
            </div>
        </main>

        {/* Side Toggle Panel (Left Navigation) */}
        <aside className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1 z-30 pointer-events-none">
            <div className="pointer-events-auto flex flex-col gap-1 bg-black dark:bg-white p-1 shadow-xl rounded-r-lg overflow-hidden">
                <button className="size-10 flex items-center justify-center text-white dark:text-black bg-primary">
                    <span className="material-symbols-outlined">edit_note</span>
                </button>
                <Link to={`/my-resume/${resumeId}/view`}>
                    <button className="size-10 flex items-center justify-center text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                    </button>
                </Link>
                <button className="size-10 flex items-center justify-center text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors">
                    <span className="material-symbols-outlined">download</span>
                </button>
                <button className="size-10 flex items-center justify-center text-white/50 dark:text-black/50 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10 transition-colors">
                    <span className="material-symbols-outlined">share</span>
                </button>
            </div>
        </aside>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume