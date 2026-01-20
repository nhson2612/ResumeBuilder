import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function CTASection() {
    const { t } = useTranslation();

    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="max-w-[1280px] mx-auto bg-primary text-white p-12 lg:p-20 relative">
                <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
                    <span className="material-symbols-outlined text-[300px] leading-none -mr-20 -mt-20">rocket_launch</span>
                </div>
                <div className="relative z-10 max-w-2xl flex flex-col gap-8">
                    <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        Ready to upgrade <br />your trajectory?
                    </h2>
                    <p className="text-lg font-medium text-white/80">
                        Join 50,000+ professionals who have already calibrated their career with AiCV.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input className="flex-1 bg-white/10 border-2 border-white/30 rounded px-6 py-4 font-bold uppercase tracking-widest text-white placeholder:text-white/50 focus:border-white focus:outline-none focus:ring-0" placeholder="ENTER WORK EMAIL" type="email" />
                        <Link to="/auth/sign-in">
                            <button className="bg-white text-primary px-10 py-4 rounded font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-transform">
                                Get Access Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTASection;
