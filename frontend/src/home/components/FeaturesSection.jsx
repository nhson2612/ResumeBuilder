import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import JdAiMatching from '@/assets/images/jd-ai-matching.png';
import mockInterview from '@/assets/images/mock-interview.png';
import sharpKanban from '@/assets/images/sharp-kanban.png';

function FeaturesSection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 bg-[#fcf9f8] dark:bg-[#1d0f0c] border-y border-[#ead2cd] dark:border-[#3a2621]">
            <div className="max-w-[1280px] mx-auto">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
                        The AI Career <span className="text-primary italic">Workflow</span>
                    </h2>
                    <p className="text-[#a15645] dark:text-[#ead2cd] font-medium max-w-xl">
                        Three distinct technical phases designed to calibrate your profile and dominate the application pipeline.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-[#ead2cd] dark:bg-[#3a2621] border border-[#ead2cd] dark:border-[#3a2621]">
                    {/* Feature 1 */}
                    <Link to="/dashboard/jobs" className="bg-white dark:bg-background-dark p-10 flex flex-col gap-6 group hover:bg-primary transition-all duration-300">
                        <div className="size-14 bg-primary/10 text-primary flex items-center justify-center rounded group-hover:bg-white group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">target</span>
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-white">JD AI Matching</h3>
                        <p className="text-[#a15645] dark:text-[#ead2cd] text-sm leading-relaxed group-hover:text-white/80">
                            Reverse-engineer job descriptions with 99.8% precision. Our AI identifies semantic gaps in your experience and offers instant calibration suggestions.
                        </p>
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded mt-4 filter grayscale group-hover:grayscale-0 transition-all border border-[#ead2cd] dark:border-[#3a2621]"
                            style={{ backgroundImage: `url(${JdAiMatching})` }}
                        ></div>
                    </Link>
                    {/* Feature 2 */}
                    <Link to="/dashboard/interviews" className="bg-white dark:bg-background-dark p-10 flex flex-col gap-6 group hover:bg-primary transition-all duration-300">
                        <div className="size-14 bg-primary/10 text-primary flex items-center justify-center rounded group-hover:bg-white group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">keyboard_voice</span>
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-white">Mock Interviews</h3>
                        <p className="text-[#a15645] dark:text-[#ead2cd] text-sm leading-relaxed group-hover:text-white/80">
                            Train with the same models hiring managers use. Real-time audio waveform analysis evaluates your confidence, pacing, and technical accuracy.
                        </p>
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded mt-4 filter grayscale group-hover:grayscale-0 transition-all border border-[#ead2cd] dark:border-[#3a2621]"
                            style={{ backgroundImage: `url(${mockInterview})` }}
                        ></div>
                    </Link>
                    {/* Feature 3 */}
                    <div className="bg-white dark:bg-background-dark p-10 flex flex-col gap-6 group hover:bg-primary transition-all duration-300">
                        <div className="size-14 bg-primary/10 text-primary flex items-center justify-center rounded group-hover:bg-white group-hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-3xl">view_kanban</span>
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-white">Sharp Kanban</h3>
                        <p className="text-[#a15645] dark:text-[#ead2cd] text-sm leading-relaxed group-hover:text-white/80">
                            Centralize the chaos. A high-performance tracking system for every stage of your pipeline with automated follow-up triggers.
                        </p>
                        <div
                            className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded mt-4 filter grayscale group-hover:grayscale-0 transition-all border border-[#ead2cd] dark:border-[#3a2621]"
                            style={{ backgroundImage: `url(${sharpKanban})` }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
