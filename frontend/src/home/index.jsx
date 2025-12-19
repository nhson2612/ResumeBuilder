import Header from '@/components/custom/Header'
import Footer from '@/components/custom/Footer'
import {
  ArrowRight,
  PlayCircle,
  CheckCircle,
  Wand2, // Magic button replacement
  Video, // Video chat replacement
  Briefcase, // Work replacement
  Rocket // Added Rocket import which was missing
} from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-sans text-[#111318] dark:text-white overflow-x-hidden">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Hero Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Chip */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 mb-6">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide">✨ {t('home.hero.newBadge')}</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
                  {t('home.hero.title')} <br /> <span className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">{t('home.hero.titleHighlight')}</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {t('home.hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl text-base font-bold transition-all shadow-xl shadow-primary/25">
                    {t('home.hero.getStarted')}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button className="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 px-8 py-3.5 rounded-xl text-base font-bold transition-all">
                    <PlayCircle className="w-5 h-5 text-red-500 fill-current" />
                    {t('home.hero.watchVideo')}
                  </button>
                </div>
              </div>
              {/* Hero Image */}
              <div className="flex-1 w-full max-w-[600px] lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 aspect-[4/3] group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCPSd025jWjYodM7lBn_97mH7AUUnqYiKbUmkswmKWq7m00KiS7e1oNjO5WsqZb1E2tWUHUvuiFpP2r-trboIylb_wYx5ufS4cV4bYZhz-dG-0wqJ1C3GzLHHsbHoWSe-QXQi2phPFCiiADKaTobfI2MSuVxag99J8tm7TkH2egjG5IreT3_qiGI0Ptahhv7GNO4DC1TnShNnFQjC338FW-crD0_LMX8YTpstrxP2TFxlpmGUODr_OeKmlFfbRlqrlLeU78-IdHE8E")' }}></div>

                  {/* Floating UI Element decoration */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 flex items-center gap-4 animate-bounce">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{t('home.hero.profileOptimized')}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{t('home.hero.readyToApply')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Abstract Background Decorations */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
        </section>

        {/* Stats Section */}
        <section className="py-10 border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-[#101622]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { val: "10,000+", label: t('home.stats.stat1') },
                { val: "95%", label: t('home.stats.stat2') },
                { val: "500+", label: t('home.stats.stat3') },
                { val: "24/7", label: t('home.stats.stat4') }
              ].map((stat, index) => (
                <div key={index} className={`flex flex-col items-center justify-center text-center p-4 ${index !== 0 ? 'border-l border-gray-100 dark:border-gray-800' : ''}`}>
                  <span className="text-3xl font-black text-gray-900 dark:text-white mb-1">{stat.val}</span>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 lg:py-28 bg-gray-50 dark:bg-[#0d121c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-base font-bold text-primary uppercase tracking-wider mb-3">{t('home.howItWorks.featureTitle')}</h2>
              <h3 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-6">{t('home.howItWorks.title')}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('home.howItWorks.description')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <Wand2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.features.createResume.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {t('home.features.createResume.description')}
                </p>
                <Link to="/dashboard" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                  {t('home.features.createResume.button')} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors text-purple-600">
                  <Video className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.features.mockInterview.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {t('home.features.mockInterview.description')}
                </p>
                <Link to="/dashboard/interview" className="inline-flex items-center text-purple-600 font-bold hover:gap-2 transition-all">
                  {t('home.features.mockInterview.button')} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors text-green-600">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('home.features.findJobs.title')}</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {t('home.features.findJobs.description')}
                </p>
                <Link to="/dashboard/jobs" className="inline-flex items-center text-green-600 font-bold hover:gap-2 transition-all">
                  {t('home.features.findJobs.button')} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 lg:py-28 bg-white dark:bg-[#101622] overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">{t('home.testimonials.title')}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">{t('home.testimonials.subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl0kAigBjyb0XohrcAuW8xxlyNrLoqwjGSn6xXeazGx4VcwPYXZS_f4h5HuWkeIXvFUrGdKTFJVVFzYdkErWg7QR7R4JH8u2cFO9dLYOQo4PtMNkSKhrRw0yj3CLfBXPXlpI4w-T_9d74mNn0y5Bks5l7Uod1u9aRfEzMXiNQ_KPTyA_4NueA0aCBejsE0kRZIWndLpdnTwJVXHAK6EZeOfYxNppcvVDv8S88h1pjH_8yE_CrAZ6R_BKvcgR3_RDYUBX7ifwq44L4" },
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcXtwKxwEy5Vr7XJlEMT2ySVT8ZLMSy2nrwAjxPdMhdHboPVT4qoWJZS42-dDHDqfijkYYh_LkD3q58_m75Qgax2-2MP8vb5oJMcjNoeYkz6aGKNbJo_rZ439IkiJVaju8fW-hlrXviBpUpahyp9NNfOmUo8HXarHI0DJI0r4NSguYRTVdAYCiBgOuriG8E1ONzwzJe-gAWM0DHPVfppIbhILc42iTuNaVjphPmppbCyxglaakZEW9sOAcBsJYPEzQcmXCDhS0-Rw" },
                { img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiOogPXzOq6CdW3JuO4KOSV3QVGT-IPeS3fMedgWCe6kIG-jotTJINfxC928n3hQRePTCejiatSfQ2zfMjwq2CLr3ZNy6cCQyr31bt_mBGTW_6zweWZvwvM7BrKy6diDGqP33YKXa5wEozavnkF5bl0dMB1noWxavNO11yze5uDHYtxkzObh17jDKfb8nrdHUvP3W04noOBljxXOwF3iuTV-y7dN17q9GMahMrqxwUrLPGy5DCnu-xLXXy1JjVUTM5v86YpmvqIso" }
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
                  <div className="flex gap-1 text-yellow-400 mb-6">
                    {[...Array(5)].map((_, i) => <span key={i} className="text-xl">★</span>)}
                  </div>
                  <blockquote className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    "{t(`home.testimonials.testimonial${idx + 1}.quote`)}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${item.img}")` }}></div>
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{t(`home.testimonials.testimonial${idx + 1}.name`)}</div>
                      <div className="text-sm text-gray-500">{t(`home.testimonials.testimonial${idx + 1}.role`)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-primary dark:bg-primary-dark rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="relative z-10 px-8 py-16 md:py-20 text-center">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('home.cta.title')}</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
                {t('home.cta.subtitle')}
              </p>
              <Link to="/dashboard" className="inline-flex items-center gap-3 bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-bold transition-all shadow-lg hover:shadow-xl hover:scale-105">
                <Rocket className="w-5 h-5" />
                {t('home.cta.getStarted')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default Home