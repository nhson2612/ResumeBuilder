import Header from '@/components/custom/Header'
import { Github, Linkedin, Mail, Code, ExternalLink } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

function AboutUs() {
    const { t } = useTranslation()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                        {t('about.title')}
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t('about.subtitle')}
                    </p>
                </div>

                {/* Developer Card */}
                <div className="bg-card rounded-2xl border shadow-sm p-8 md:p-12 mb-16">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary/20">
                                <Code className="w-16 h-16" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-background p-2 rounded-full border shadow-sm">
                                <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">{t('about.developerName')}</h2>
                                <p className="text-primary font-medium">{t('about.role')}</p>
                            </div>

                            <p className="text-muted-foreground leading-relaxed">
                                {t('about.description')}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                                <a href="mailto:nguyenhuyson.dev@outlook.com">
                                    <Button variant="outline" className="gap-2">
                                        <Mail className="w-4 h-4" />
                                        nguyenhuyson.dev@outlook.com
                                    </Button>
                                </a>
                                <a href="https://github.com/nhson2612" target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon">
                                        <Github className="w-5 h-5" />
                                    </Button>
                                </a>
                                <a href="https://linkedin.com/in/nhson2612" target="_blank" rel="noopener noreferrer">
                                    <Button variant="ghost" size="icon">
                                        <Linkedin className="w-5 h-5" />
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-secondary/30 rounded-xl p-8 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">✨</span>
                            {t('about.mission.title')}
                        </h3>
                        <p className="text-muted-foreground">
                            {t('about.mission.description')}
                        </p>
                    </div>
                    <div className="bg-secondary/30 rounded-xl p-8 space-y-4">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">🎯</span>
                            {t('about.vision.title')}
                        </h3>
                        <p className="text-muted-foreground">
                            {t('about.vision.description')}
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="text-center space-y-8">
                    <h3 className="text-xl font-bold text-muted-foreground uppercase tracking-widest text-sm">
                        {t('about.builtWith')}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {[
                            { name: 'React', icon: '⚛️' },
                            { name: 'Vite', icon: '⚡' },
                            { name: 'Tailwind CSS', icon: '🎨' },
                            { name: 'Shadcn UI', icon: '🧩' },
                            { name: 'Clerk', icon: '🔒' },
                            { name: 'Prisma', icon: '🦾' },
                            { name: 'Node.js', icon: '🟢' },
                            { name: 'Express', icon: '📝' },
                            { name: 'i18next', icon: '🌐' },
                            { name: 'AI (Google)', icon: '🤖' }
                        ].map((tech) => (
                            <div key={tech.name} className="flex flex-col items-center gap-2">
                                <span className="text-2xl">{tech.icon}</span>
                                <span className="font-medium text-sm">{tech.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs
