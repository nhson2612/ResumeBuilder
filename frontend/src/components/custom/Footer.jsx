import React from 'react'
import { Link } from 'react-router-dom'
import { FileText, Facebook, Globe, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="bg-white dark:bg-background border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">AI Resume Builder</span>
                        </div>
                        <p className="text-gray-500 text-sm max-w-xs mb-6">
                            {t('footer.description')}
                        </p>
                        <div className="flex gap-4">
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#"><Facebook className="w-5 h-5" /></a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#"><Globe className="w-5 h-5" /></a>
                            <a className="text-gray-400 hover:text-primary transition-colors" href="#"><Mail className="w-5 h-5" /></a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('footer.products')}</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.features')}</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.templates')}</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.pricing')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('footer.support')}</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.help')}</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.contact')}</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.privacy')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">{t('footer.company')}</h4>
                        <ul className="space-y-3 text-sm text-gray-500">
                            <li><Link className="hover:text-primary transition-colors" to="/about-us">{t('footer.about')}</Link></li>
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.blog')}</a></li>
                            <li><a className="hover:text-primary transition-colors" href="#">{t('footer.careers')}</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">© 2024 AI Resume Builder. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-gray-400">
                        <a className="hover:text-primary transition-colors" href="#">{t('footer.terms')}</a>
                        <a className="hover:text-primary transition-colors" href="#">{t('footer.privacy')}</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
