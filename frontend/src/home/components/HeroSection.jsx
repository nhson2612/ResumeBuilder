import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScanningCard from './ScanningCard';

function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="relative pt-20 pb-16 px-6 overflow-hidden">
            <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 text-primary rounded w-fit animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <span className="material-symbols-outlined text-sm">bolt</span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Next-Gen Career Optimization</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tighter uppercase text-[#1d0f0c] dark:text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                        {t('home.hero.title', 'Optimize your')} <br /><span className="text-primary italic">{t('home.hero.highlight', 'career')}</span> {t('home.hero.suffix', 'at the speed of AI.')}
                    </h1>
                    <p className="text-lg text-[#a15645] dark:text-[#ead2cd] max-w-md font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        {t('home.hero.subtitle', 'Transform your legacy CV through our precision AI lens and outpace the competition with real-time matching and simulation.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link to="/dashboard">
                            <button className="bg-primary text-white px-8 py-5 rounded font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 w-full sm:w-auto hover:bg-primary/90 transition-colors hover:scale-105 active:scale-95 duration-300 shadow-lg hover:shadow-primary/25">
                                {t('home.hero.cta', 'Start Optimizing')} <span className="material-symbols-outlined">center_focus_strong</span>
                            </button>
                        </Link>
                        <button className="border-2 border-[#1d0f0c] dark:border-white text-[#1d0f0c] dark:text-white px-8 py-5 rounded font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:bg-[#1d0f0c] hover:text-white dark:hover:bg-white dark:hover:text-[#1d0f0c] transition-colors hover:scale-105 active:scale-95 duration-300">
                            {t('home.hero.demo', 'Watch Demo')} <span className="material-symbols-outlined">play_circle</span>
                        </button>
                    </div>
                </div>
                <ScanningCard />
            </div>
        </section>
    );
}

export default HeroSection;
