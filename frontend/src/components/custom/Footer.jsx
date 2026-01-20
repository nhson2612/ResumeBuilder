import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="bg-white dark:bg-background-dark border-t border-[#ead2cd] dark:border-[#3a2621] py-16 px-6 font-display">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-12">
                <div className="flex flex-col gap-6 max-w-xs">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl">biotech</span>
                        <h2 className="text-lg font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8]">AiCV Optimizer</h2>
                    </div>
                    <p className="text-xs text-[#a15645] dark:text-[#ead2cd] font-medium leading-relaxed">
                        {t('footer.description', 'Precision engineering for the modern professional. Built on advanced neural architectures to ensure your talent meets the right opportunity.')}
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Platform</h4>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.features', 'Features')}</a>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.integrations', 'Integrations')}</a>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.security', 'Security')}</a>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Company</h4>
                        <Link className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" to="/about-us">{t('footer.about', 'About Us')}</Link>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.careers', 'Careers')}</a>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.contact', 'Contact')}</a>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Legal</h4>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.privacy', 'Privacy')}</a>
                        <a className="text-xs font-bold uppercase tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8] hover:text-primary transition-colors" href="#">{t('footer.terms', 'Terms')}</a>
                    </div>
                </div>
            </div>
            
            <div className="max-w-[1280px] mx-auto mt-16 pt-8 border-t border-[#ead2cd] dark:border-[#3a2621] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#a15645] dark:text-[#ead2cd]">© 2024 AiCV Optimizer. All Rights Reserved.</p>
                <div className="flex gap-6 text-[#1d0f0c] dark:text-[#fcf9f8]">
                    <span className="material-symbols-outlined text-xl cursor-pointer hover:text-primary transition-colors">share</span>
                    <span className="material-symbols-outlined text-xl cursor-pointer hover:text-primary transition-colors">language</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer