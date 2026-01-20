import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher'

function Header() {
    const { user, isSignedIn } = useUser();
    const { t } = useTranslation();

    return (
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-solid border-[#ead2cd] dark:border-[#3a2621] font-display">
            <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
                <Link to={'/'} className="flex items-center gap-3 group">
                    <div className="text-primary transition-transform group-hover:rotate-12">
                        <span className="material-symbols-outlined text-4xl leading-none">biotech</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-tight uppercase text-[#1d0f0c] dark:text-[#fcf9f8]">
                        AiCV Optimizer
                    </h2>
                </Link>

                <nav className="hidden md:flex items-center gap-10">
                    <Link to="/dashboard/jobs" className="text-sm font-semibold text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors uppercase tracking-widest">
                        Workflow
                    </Link>
                    <Link to="/dashboard/interviews" className="text-sm font-semibold text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors uppercase tracking-widest">
                        Simulations
                    </Link>
                    <a href="#" className="text-sm font-semibold text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors uppercase tracking-widest">
                        Pricing
                    </a>
                </nav>

                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    
                    {isSignedIn ? (
                        <div className="flex items-center gap-4">
                            <Link to={'/dashboard'}>
                                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                                    {t('common.dashboard')}
                                </Button>
                            </Link>
                            <UserButton />
                        </div>
                    ) : (
                        <>
                            <Link to={'/auth/sign-in'} className="text-sm font-bold uppercase tracking-widest px-4 text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors">
                                {t('common.login')}
                            </Link>
                            <Link to={'/auth/sign-in'}>
                                <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded font-bold uppercase tracking-widest text-xs flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/25">
                                    Get Started <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header