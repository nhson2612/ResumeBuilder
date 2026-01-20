import React from 'react';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CTASection from './components/CTASection';

function Home() {
    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-[#1d0f0c] dark:text-[#fcf9f8] selection:bg-primary selection:text-white min-h-screen flex flex-col">
            <Header />

            <main className="relative flex-grow">
                {/* Background Pattern */}
                <div className="absolute inset-0 angular-pattern opacity-30 pointer-events-none"></div>

                <HeroSection />
                <FeaturesSection />
                <CTASection />
            </main>

            <Footer />
        </div>
    );
}

export default Home;
