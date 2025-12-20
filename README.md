# AI Resume Builder

**AI Resume Builder** is an intelligent web application designed to help you create professional, ATS-optimized resumes that truly stand out. By leveraging advanced AI that learns from your unique profile, it builds personalized resumes tailored to your career goals.

![AI Resume Builder Banner](https://placehold.co/1200x400/1e3a5f/ffffff?text=AI+Resume+Builder)

## 🚀 Features

- **🧠 Personalized AI Content**: The AI analyzes your profile to generate custom summaries, experience descriptions, and skill lists that reflect *your* unique professional journey.
- **🎨 6 Premium Templates**: Choose from a variety of professionally designed templates to match your industry and style:
    - **Classic**: Traditional, elegant, and timeless.
    - **Modern**: Clean two-column layout with a sidebar.
    - **Minimal**: Simple, whitespace-focused design.
    - **Professional**: Corporate style with timeline visuals.
    - **Executive**: Premium look with sophisticated typography.
    - **Creative**: Bold colors and unique layouts for creative roles.
- **👁️ Live Preview & Customization**: See changes in real-time as you edit. Customize theme colors, fonts, and layouts to make the resume your own.
- **🎤 AI Mock Interview**: Practice for your interview with an AI interviewer that asks questions based on *your* specific resume content and provides instant feedback.
- **🌍 Multi-Language Support**: Fully localized in English and Vietnamese.
- **🔐 Secure Authentication**: Powered by Clerk for secure and seamless user access.
- **📄 Smart PDF Export**: Download your resume as a high-quality, ATS-friendly PDF.

## 🛠️ Tech Stack

### Frontend
- **React 18**: Core UI library for building interactive components.
- **Vite**: Lightning-fast build tool and dev server.
- **Tailwind CSS**: Utility-first framework for custom responsive designs.
- **Shadcn UI**: Accessible and customizable component primitives.
- **Clerk**: Secure, drop-in authentication for React.
- **React Router**: Seamless client-side navigation.
- **Lucide React**: Beautiful, consistent icon set.

### Backend
- **Node.js**: Robust JavaScript runtime.
- **Express.js**: Fast, unopinionated web framework.
- **Prisma & PostgreSQL**: Powerful ORM and database for reliable data management (via Supabase).
- **Gemini AI & Groq SDK**: State-of-the-art AI models for content generation and interview simulation.

## 📋 Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **PostgreSQL Database** (e.g., local or Supabase)
- **API Keys**:
  - Google Generative AI (Gemini)
  - Groq AI
  - Clerk (Publishable & Secret Keys)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ai-resume-builder.git
cd ai-resume-builder
```

### 2. Frontend Setup
Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BACKEND_URL=http://localhost:5000/api/
```

Start the frontend:
```bash
npm run dev
```

### 3. Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd ../backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
DATABASE_URL="postgresql://user:password@host:5432/db?schema=public"
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

Sync the database schema:
```bash
npx prisma generate
npx prisma db push
```

Start the backend:
```bash
npm run dev
```

## 🚀 Usage Guide

1.  **Sign Up/Login**: Create an account to save your resumes.
2.  **Create Resume**: Enter your basic details and let the AI assist you with optimal wording.
3.  **Customize**:
    - Select one of the **6 templates** (Classic, Modern, Professional, etc.).
    - Adjust the **theme color** to fit your personal brand.
4.  **Practice**: Use the **Mock Interview** feature to prepare for your job interview.
5.  **Download**: Export your finished resume as a PDF.

## 🎤 AI Interview Feature Documentation

### Feature Overview and Functionality

The AI Interview feature provides users with an interactive mock interview experience that generates questions based on their resume content. The system uses AI to simulate real interview scenarios, providing personalized feedback and evaluation of responses. Key features include:

- **Resume-based questions**: Questions are generated based on the user's resume content
- **Multiple difficulty levels**: Easy, medium, and hard difficulty settings
- **Real-time evaluation**: AI evaluates responses and provides feedback
- **Voice support**: Speech recognition and text-to-speech capabilities
- **Performance tracking**: Detailed statistics and feedback on responses
- **Session history**: Save and review past interview sessions
- **Weak question review**: Identify and practice questions that need improvement

### API Endpoints for Interview Functionality

The backend provides a comprehensive REST API for managing interview sessions:

#### Session Management
- `GET /api/interview/sessions` - Retrieve all interview sessions for the authenticated user
- `POST /api/interview/sessions` - Create a new interview session
- `GET /api/interview/sessions/:id` - Get detailed information about a specific session
- `PUT /api/interview/sessions/:id/complete` - Mark a session as completed
- `DELETE /api/interview/sessions/:id` - Delete an interview session

#### Question Management
- `POST /api/interview/sessions/:id/questions` - Save a question and answer to a session
- `GET /api/interview/weak-questions` - Retrieve all questions marked as weak for review

#### Example API Usage

**Creating a new interview session:**
```javascript
const sessionData = {
  resumeId: "resume-123",
  questionCount: 5,
  difficulty: "medium",
  voiceEnabled: false
};

const response = await fetch('/api/interview/sessions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(sessionData)
});
```

**Saving a question and answer:**
```javascript
const questionData = {
  questionNumber: 1,
  question: "Tell me about your experience with React",
  userAnswer: "I have been working with React for 3 years...",
  evaluation: "good",
  aiFeedback: "Great explanation of your React experience",
  suggestedAnswer: "You could mention specific projects you worked on"
};

const response = await fetch(`/api/interview/sessions/${sessionId}/questions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(questionData)
});
```

### Database Schema Changes

The interview feature introduces two new database models in the Prisma schema:

#### InterviewSession Model
```prisma
model InterviewSession {
  id            Int       @id @default(autoincrement())
  sessionId     String    @unique
  userId        String
  resumeId      String?

  // Settings
  questionCount Int       @default(5)
  difficulty    String    @default("medium") // easy, medium, hard
  voiceEnabled  Boolean   @default(false)

  // Results
  totalScore    Int?
  status        String    @default("in_progress") // in_progress, completed
  completedAt   DateTime?

  // Relations
  questions     InterviewQuestion[]

  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

#### InterviewQuestion Model
```prisma
model InterviewQuestion {
  id            Int       @id @default(autoincrement())
  questionId    String    @unique
  sessionId     String
  session       InterviewSession @relation(fields: [sessionId], references: [sessionId])

  questionNumber Int
  question      String
  userAnswer    String?

  // AI Evaluation
  evaluation    String?   // good, needs_improvement, weak
  aiFeedback    String?
  suggestedAnswer String?

  createdAt     DateTime  @default(now())
}
```

### Frontend Components and User Interface

The interview feature is implemented through two main React components:

#### InterviewPrep Component
Located at `frontend/src/dashboard/resume/components/InterviewPrep.jsx`, this component provides the interactive interview interface:

- **Settings panel**: Allows users to configure question count (3-10), difficulty level (easy/medium/hard), and voice mode
- **Chat interface**: Interactive conversation between user and AI interviewer
- **Voice controls**: Speech recognition for answering questions and text-to-speech for questions
- **Evaluation indicators**: Visual feedback on response quality (good, needs_improvement, weak)
- **Session tracking**: Real-time statistics on question performance

#### InterviewHistory Component
Located at `frontend/src/dashboard/InterviewHistory.jsx`, this component allows users to:

- **View session history**: Browse all past interview sessions
- **Review details**: See questions, answers, and AI feedback for each session
- **Practice weak questions**: Focus on questions that need improvement
- **Delete sessions**: Remove unwanted interview records

### Security Considerations

- **Authentication**: All interview endpoints require valid Clerk authentication tokens
- **Authorization**: Users can only access their own interview sessions
- **Data isolation**: Session data is properly isolated by user ID
- **Input validation**: All API inputs are validated to prevent injection attacks
- **Rate limiting**: API endpoints are protected against excessive requests

### Setup and Configuration Requirements

#### Environment Variables
The following environment variables are required for the interview feature:

- `GROQ_API_KEY` or `GEMINI_API_KEY`: AI model API key for question generation and evaluation
- `DATABASE_URL`: Database connection string for storing interview data

#### Browser Requirements
- **Speech Recognition**: Requires modern browsers with Web Speech API support (Chrome, Edge, Firefox with permissions)
- **Text-to-Speech**: Supported in all modern browsers with Speech Synthesis API
- **HTTPS**: Recommended for speech recognition functionality (required in production)

#### Additional Setup
1. Ensure your database schema is updated with the new interview models:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
2. Verify that your AI model API keys are properly configured
3. Ensure the backend server can handle the additional load from AI requests

### Usage Instructions for End Users

1. **Access the feature**: Navigate to your resume and click the "AI Interview Prep" button
2. **Configure settings**: Set the number of questions (3-10), difficulty level, and enable voice mode if desired
3. **Start interview**: Click "Start Interview" to begin the session
4. **Respond to questions**: Answer each question either by typing or speaking (if voice mode is enabled)
5. **Receive feedback**: Get real-time evaluation and suggestions for improvement
6. **Review results**: After completing the session, review your performance and weak questions
7. **Practice again**: Return to the interview history to review sessions or practice weak questions

### Special Requirements

#### Browser Support
- **Speech Recognition**: Works best in Chrome, Edge, and Safari; partial support in Firefox
- **Text-to-Speech**: Available in all modern browsers (Chrome, Firefox, Safari, Edge)
- **Minimum versions**: Chrome 25+, Firefox 49+, Safari 7+, Edge 14+

#### Technical Requirements
- **Internet Connection**: Stable connection required for AI model requests
- **Microphone Access**: Required for voice mode (user must grant permission)
- **Browser Permissions**: Speech recognition requires explicit user permission
- **Security**: HTTPS required in production for speech recognition APIs

#### Performance Considerations
- AI model response times may vary based on API availability
- Speech recognition accuracy may vary based on audio quality and accents
- Text-to-speech voices vary by browser and operating system

## 🤝 Contributing

Contributions are welcome!
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ by [Your Name]**
