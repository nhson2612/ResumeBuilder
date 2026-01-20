export default function PinelineTableSection() {
    return (
        <section className="py-24 px-6">
            <div className="max-w-[1280px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Application Pipeline</h2>
                        <p className="text-[#a15645] dark:text-[#ead2cd] font-medium mt-2">Live tracking of active optimization cycles.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white dark:bg-[#1d0f0c] border border-[#ead2cd] dark:border-[#3a2621] font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">filter_list</span> Filter
                        </button>
                        <button className="px-4 py-2 bg-primary text-white font-bold text-xs uppercase tracking-widest rounded flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">add</span> New Application
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-[#1d0f0c] border-2 border-[#1d0f0c] dark:border-[#ead2cd] shadow-[8px_8px_0px_0px_#fe512a]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-[#1d0f0c] dark:border-[#ead2cd]">
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Target Company</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Position</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em]">Optimization</th>
                                    <th className="px-8 py-5 text-xs font-black uppercase tracking-[0.2em] text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#ead2cd] dark:divide-[#3a2621]">
                                <tr className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 bg-[#1d0f0c] rounded-sm flex items-center justify-center text-white font-bold">G</div>
                                            <span className="font-bold">Google Cloud</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-[#a15645] dark:text-[#ead2cd]">Senior Product Designer</td>
                                    <td className="px-8 py-6">
                                        <span className="bg-[#f4e9e6] dark:bg-[#3a2621] px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">Interviewing</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-[#ead2cd] dark:bg-[#3a2621] rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: '85%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold font-mono">85%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-primary material-symbols-outlined hover:scale-110 transition-transform">open_in_new</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 bg-[#1d0f0c] rounded-sm flex items-center justify-center text-white font-bold">S</div>
                                            <span className="font-bold">Stripe Payments</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-[#a15645] dark:text-[#ead2cd]">Staff Engineer</td>
                                    <td className="px-8 py-6">
                                        <span className="bg-primary/20 text-primary px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">To Apply</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-[#ead2cd] dark:bg-[#3a2621] rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{ width: '22%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold font-mono">22%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-primary material-symbols-outlined hover:scale-110 transition-transform">open_in_new</button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-primary/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 bg-[#1d0f0c] rounded-sm flex items-center justify-center text-white font-bold">V</div>
                                            <span className="font-bold">Vercel Inc.</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 font-medium text-[#a15645] dark:text-[#ead2cd]">UI Architect</td>
                                    <td className="px-8 py-6">
                                        <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full">Offered</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-[#ead2cd] dark:bg-[#3a2621] rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: '100%' }}></div>
                                            </div>
                                            <span className="text-xs font-bold font-mono">100%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="text-primary material-symbols-outlined hover:scale-110 transition-transform">open_in_new</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}