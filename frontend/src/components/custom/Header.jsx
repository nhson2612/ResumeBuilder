import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { UserButton, useUser } from '@clerk/clerk-react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher'

function Header() {
    const { user, isSignedIn } = useUser();
    const { t } = useTranslation();

    return (
        <div className='p-3 px-5 flex justify-between shadow-md sticky top-0 z-50 w-full bg-white dark:bg-background'>
            <Link to={'/'} className="flex items-center gap-2 text-primary cursor-pointer">
                <div className="size-10 flex items-center justify-center overflow-hidden">
                    <svg
                        fill="none"
                        viewBox="0 0 48 48"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12 4H30L42 16V44C42 45.1046 41.1046 46 40 46H12C10.8954 46 10 45.1046 10 44V6C10 4.89543 10.8954 4 12 4Z"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="4"
                        ></path>
                    </svg>
                </div>
                <h2 className="text-primary text-xl font-bold leading-tight tracking-[-0.015em]">
                    AI Resume Builder
                </h2>
            </Link>
            <div className='flex gap-2 items-center'>
                <Link to={'/about-us'}>
                    <Button variant="ghost">{t('common.about')}</Button>
                </Link>
                <LanguageSwitcher />
                {isSignedIn ?
                    <>
                        <Link to={'/dashboard'}>
                            <Button variant="outline">{t('common.dashboard')}</Button>
                        </Link>
                        <UserButton />
                    </> :
                    <Link to={'/auth/sign-in'}>
                        <Button>{t('common.login')}</Button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header