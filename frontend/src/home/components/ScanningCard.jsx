import React from 'react';

function ScanningCard() {
    return (
        <div className="relative group perspective-1000">
            {/* Floating Background Card (Rotated) */}
            <div className="absolute -inset-4 bg-primary/5 rounded-xl border border-primary/10 -rotate-1 transition-transform duration-500 group-hover:rotate-2 group-hover:scale-105"></div>
            
            {/* Main Card */}
            <div className="relative bg-white dark:bg-[#1d0f0c] border-2 border-[#1d0f0c] dark:border-[#ead2cd] p-6 shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_rgba(254,81,42,0.2)] hover:-translate-y-2">
                
                {/* Simulated AI Scanning Effect - Moving Line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-primary z-10 shadow-[0_0_15px_rgba(254,81,42,0.8)] animate-scan"></div>
                
                <div className="flex flex-col gap-4">
                    {/* Header Skeleton */}
                    <div className="h-8 w-3/4 bg-[#f4e9e6] dark:bg-[#3a2621] rounded animate-pulse"></div>
                    
                    {/* Stats Grid Skeleton */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="h-4 bg-primary/20 rounded animate-pulse delay-75"></div>
                        <div className="h-4 bg-primary/40 rounded animate-pulse delay-150"></div>
                        <div className="h-4 bg-primary/60 rounded animate-pulse delay-200"></div>
                    </div>
                    
                    {/* Content Area */}
                    <div className="space-y-3 pt-4 border-t border-[#ead2cd] dark:border-[#3a2621]">
                        <div className="flex justify-between items-end">
                            <div className="space-y-2 w-2/3">
                                <div className="h-3 w-full bg-[#ead2cd] dark:bg-[#3a2621] rounded animate-pulse"></div>
                                <div className="h-3 w-4/5 bg-[#ead2cd] dark:bg-[#3a2621] rounded animate-pulse delay-75"></div>
                            </div>
                            <div className="text-right">
                                <div className="text-primary font-black text-4xl animate-bounce-slow">98%</div>
                                <div className="text-[10px] uppercase font-bold tracking-widest text-[#1d0f0c] dark:text-[#fcf9f8]">Match Score</div>
                            </div>
                        </div>
                        
                        {/* Image/Visual Representation */}
                        <div 
                            className="h-[200px] w-full bg-cover bg-center rounded border border-[#ead2cd] dark:border-[#3a2621] relative overflow-hidden group-hover:brightness-110 transition-all duration-500" 
                            style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAO2xkeG-ZzGQN6mXa1XQTK8v04WI9GXWKkKqOnV5l9tSi1hAt6AdQEg3AYdaKLiMH6NyPe31KU6vFm_7-peS46JngBVC04KuJ94-8GfpNO57PYdt9GfigeM8w1bbocPyeEDYGaUuQiYzItuiA1JCrF8UI2yEEoN3bneBLD-xGaE1RF2INrRJRuwXK97tzlTfR3JKqe3e3ZOFpbzVSZJMzTXyhV4g8etRMtbxh68QItIT31Qbkc3qr09Q92bpUyEPnJG1hqv4bq2fc")'}}
                        >
                             <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScanningCard;