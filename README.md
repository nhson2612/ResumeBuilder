# AI Resume Builder

AI Resume Builder is a comprehensive web application that helps users create professional, ATS-optimized resumes using artificial intelligence. The platform combines modern web technologies with AI-powered content generation to streamline the job application process.

## 🚀 Features

- **AI-Powered Resume Creation**: Automatically generates and optimizes resume content based on your experience and skills
- **Multi-Language Support**: Available in English and Vietnamese with full internationalization
- **Job Application Tracker**: Track your job applications with a Kanban-style interface
- **Mock Interview Preparation**: Practice interview questions with AI, featuring markdown-formatted feedback for better readability
- **Professional Templates**: Multiple professionally designed resume templates
- **Responsive Design**: Fully responsive interface that works on all devices
- **Dark Mode**: Eye-friendly dark mode option
- **User Authentication**: Secure user authentication via Clerk
- **PDF Export**: Export your resume as a professional PDF
- **About Us Page**: Dedicated page sharing our mission and team details

## 🛠️ Tech Stack

### Frontend
- **React 18**: Component-based UI library
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn UI & Radix UI**: Accessible UI components
- **React Router**: Client-side routing
- **i18next**: Internationalization framework
- **Lucide React**: Beautiful vector icons
- **Axios**: HTTP client for API requests
- **Sonner**: Toaster for toast notifications
- **React Markdown**: Rendering markdown content

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **Prisma ORM**: Database toolkit
- **Clerk**: User authentication
- **Google Generative AI**: AI model integration
- **Groq SDK**: AI API integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL (for database)
- API keys for AI services (Google Generative AI, Groq, Clerk)

## 🔧 Installation

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000/api/
```

4. Start the development server:
```bash
npm run dev
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/ai-resume-builder"
GROQ_API_KEY=your_groq_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. Setup the database (if using Prisma):
```bash
npx prisma generate
npx prisma db push
```

5. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
AI-Resume-Builder/
├── backend/
│   ├── index.js
│   ├── prisma/
│   ├── src/
│   │   ├── routes/
│   │   └── controllers/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── locales/        # Translation files
│   │   ├── services/       # API services (GlobalApi.js)
│   │   ├── auth/           # Authentication pages
│   │   ├── home/           # Landing page
│   │   ├── dashboard/      # Main dashboard
│   │   ├── my-resume/      # Resume viewing
│   │   └── about/          # About Us page
│   ├── package.json
│   └── vite.config.js
```

## 🌐 Environment Variables

### Frontend
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk publishable key for authentication
- `VITE_BACKEND_URL`: URL of the backend API (e.g., http://localhost:5000/api/)

### Backend
- `PORT`: Server port (default: 5000)
- `DATABASE_URL`: Database connection string
- `GROQ_API_KEY`: Groq API key for AI services
- `CLERK_SECRET_KEY`: Clerk secret key for backend authentication

## 🚀 Usage

1. Sign up or log in to your account
2. Create a new resume using the AI-powered builder
3. Customize your resume with one of the professional templates
4. Use the mock interview feature to practice for interviews
5. Track your job applications with the job tracker
6. Export your resume as a PDF when ready

## 🌍 Internationalization

This application supports multiple languages:
- English (default)
- Vietnamese

The application automatically detects the user's preferred language or allows manual selection.

## 🤖 AI Integration

The app leverages multiple AI models to:
- Generate professional summary statements
- Optimize job experience descriptions
- Create skill recommendations
- Provide interview preparation

## 📊 API Endpoints

### Authentication
- `/auth/sign-in` - User sign-in
- `/auth/sign-up` - User sign-up

### Resume Management
- `GET /api/resumes` - Get user's resumes
- `POST /api/resumes` - Create a new resume
- `PUT /api/resumes/:id` - Update a resume
- `DELETE /api/resumes/:id` - Delete a resume

### AI Services
- `POST /api/ai-chat` - Generate AI content for resumes

### Job Tracking
- `GET /api/jobs` - Get job applications
- `POST /api/jobs` - Add new job application
- `PUT /api/jobs/:id` - Update job application status

## 🧪 Testing

Coming soon...

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or issues, please open an issue in the repository or contact me directly.

## 🙏 Acknowledgements

- [React](https://reactjs.org/) for the amazing UI library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
- [Clerk](https://clerk.dev/) for authentication
- [Prisma](https://prisma.io/) for database management
- [i18next](https://www.i18next.com/) for internationalization
- [Lucide React](https://lucide.dev/) for beautiful icons
