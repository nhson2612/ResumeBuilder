import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { describe, it, expect, vi } from 'vitest';

// Mock Clerk hooks
vi.mock('@clerk/clerk-react', () => ({
    UserButton: () => <div>UserButton</div>,
    useUser: () => ({
        user: null,
        isSignedIn: false
    })
}));

// Mock Translation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key
    })
}));

// Mock LanguageSwitcher
vi.mock('../LanguageSwitcher', () => ({
    default: () => <div>LanguageSwitcher</div>
}));


describe('Header Component', () => {
    it('renders the logo text correctly', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const logoText = screen.getByText('AI Resume Builder');
        expect(logoText).toBeInTheDocument();
    });
});
