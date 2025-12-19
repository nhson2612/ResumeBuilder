# AI Resume Builder Project Context

## Project Overview

The AI Resume Builder is a full-stack web application that helps users create professional resumes using AI technology. The project consists of a React frontend built with Vite and a Node.js/Express backend. It features AI-powered resume content generation, a job application tracker, and internationalization support for English and Vietnamese.

### Key Features
- AI-powered resume creation and optimization using Google's Generative AI and Groq
- User authentication via Clerk
- Resume management and editing capabilities
- Job application tracking system
- Mock interview preparation functionality
- Multi-language support (English and Vietnamese)
- Responsive design with dark mode support

### Technology Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Radix UI, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: Prisma ORM with PostgreSQL (implied from package.json)
- **Authentication**: Clerk
- **AI Integration**: Google Generative AI, Groq SDK
- **Internationalization**: i18next
- **Styling**: Tailwind CSS with custom components

## Project Structure

```
AI-Resume-Builder/
├── backend/
│   ├── index.js (main server entry point)
│   ├── prisma/ (database schema and migrations)
│   ├── src/
│   │   ├── routes/ (API route definitions)
│   │   └── controllers/ (request handling logic)
├── frontend/
│   ├── public/ (static assets)
│   ├── src/
│   │   ├── components/ (UI components)
│   │   ├── locales/ (i18n translation files)
│   │   ├── auth/ (authentication pages)
│   │   ├── home/ (landing page)
│   │   ├── dashboard/ (main application dashboard)
│   │   └── my-resume/ (resume viewing components)
│   ├── package.json
│   └── vite.config.js
```

## Building and Running

### Frontend
- `cd frontend`
- Install dependencies: `npm install`
- Set environment variables (VITE_CLERK_PUBLISHABLE_KEY)
- Start development server: `npm run dev`
- Build for production: `npm run build`

### Backend
- `cd backend`
- Install dependencies: `npm install`
- Set environment variables (GROQ_API_KEY, DATABASE_URL, etc.)
- Start development server: `npm run dev` (with nodemon) or `npm start`
- Prisma setup: `npx prisma generate` and `npx prisma db push`

## Key Development Conventions

### Frontend
- Component-based architecture using React
- Internationalization using i18next with translation context in `src/locales/`
- Routing with React Router DOM
- Authentication state management with Clerk
- State management using React hooks
- CSS styling with Tailwind CSS and custom components

### Backend
- RESTful API design with Express
- Middleware for authentication and error handling
- Controller pattern for request processing
- Environment variable management for API keys

### Internationalization
- Translation keys are structured in `en.json` and `vi.json` files
- The `home` section contains nested translations for hero, features, testimonials, etc.
- Components use the `useTranslation` hook and `t()` function for dynamic text
- Language detection uses browser language and localStorage

### File Structure
- Components are organized by feature in the `src/components/` directory
- Pages are organized by route in directories like `src/home/`, `src/dashboard/`, etc.
- Common UI components use the shadcn/ui pattern with a `ui` subdirectory
- Custom components are in the `custom` subdirectory within components

## Important Files

- `frontend/src/i18n.js` - Internationalization configuration
- `frontend/src/main.jsx` - Application entry point with routing setup
- `frontend/src/App.jsx` - Main application layout
- `backend/index.js` - Backend server entry point
- `frontend/src/locales/en.json` and `vi.json` - Translation files

## API Endpoints

- `/api/resume` - Resume management
- `/api/ai-chat` - AI content generation
- `/api/jobs` - Job application tracking
- Authentication routes via Clerk

## Environment Variables

### Frontend
- `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key for authentication

### Backend
- `GROQ_API_KEY` - API key for Groq AI service
- `DATABASE_URL` - Database connection string
- `CLERK_SECRET_KEY` - Clerk secret key
- `PORT` - Server port (default 5000)

## Current State

The project is actively developed with internationalization features being refined. The home page implements i18n with proper translation keys for all content, and both English and Vietnamese translations are maintained in the locale files. The AI functionality leverages both Google Generative AI and Groq services for content generation, with fallback mock responses when API keys are not configured.