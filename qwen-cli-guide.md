# qwen-cli Guide

Welcome to the qwen-cli guide! This command-line interface tool helps you interact with the AI Resume Builder project from your terminal. The qwen-cli provides utilities for managing your resume, job applications, and AI features directly from the command line.

## Table of Contents
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [Configuration](#configuration)
- [Commands](#commands)
- [Examples](#examples)
- [Advanced Usage](#advanced-usage)
- [Troubleshooting](#troubleshooting)

## Installation

### Prerequisites
Before installing qwen-cli, ensure you have the following:
- Node.js version 16.x or higher
- npm or yarn package manager
- Access to the AI Resume Builder project

### Installing qwen-cli

#### Option 1: Using npm
```bash
npm install -g @ai-resume-builder/qwen-cli
```

#### Option 2: Using yarn
```bash
yarn global add @ai-resume-builder/qwen-cli
```

#### Option 3: From source
```bash
git clone https://github.com/your-org/ai-resume-builder.git
cd ai-resume-builder
cd qwen-cli
npm install -g .
```

After installation, verify the installation worked:
```bash
qwen-cli --version
```

## Basic Usage

Once installed, you can use qwen-cli to interact with the AI Resume Builder project:

```bash
qwen-cli [command] [options]
```

Get help with:
```bash
qwen-cli --help
# or
qwen-cli -h
```

## Configuration

qwen-cli requires certain environment variables to be set for full functionality. Create a `.env` file in your project root with the following variables:

```bash
# API Keys
GROQ_API_KEY=your_groq_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ai-resume-db"

# Frontend
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

Alternatively, you can set these as environment variables in your shell profile.

## Commands

### `init`
Initialize a new AI Resume Builder project:

```bash
qwen-cli init [project-name]
```

Options:
- `-d, --directory [dir]`: Specify the project directory
- `--frontend-only`: Initialize only the frontend
- `--backend-only`: Initialize only the backend

### `dev`
Start development servers for both frontend and backend:

```bash
qwen-cli dev
```

Options:
- `--frontend`: Start only the frontend development server
- `--backend`: Start only the backend development server
- `--port [port]`: Specify the port for the frontend server (default: 5173)

### `build`
Build the project for production:

```bash
qwen-cli build
```

Options:
- `--frontend`: Build only the frontend
- `--backend`: Build only the backend
- `--output [dir]`: Specify the output directory

### `db`
Manage the database:

```bash
qwen-cli db [command]
```

Commands:
- `migrate`: Run pending database migrations
- `reset`: Reset the database to initial state
- `seed`: Seed the database with sample data
- `studio`: Open Prisma Studio for database inspection

### `resume`
Manage your resume:

```bash
qwen-cli resume [command]
```

Commands:
- `create`: Create a new resume
- `list`: List all your resumes
- `view [id]`: View a specific resume
- `update [id]`: Update an existing resume
- `delete [id]`: Delete a resume
- `export [id]`: Export a resume in various formats (PDF, DOCX, JSON)

### `ai`
Interact with AI features:

```bash
qwen-cli ai [command]
```

Commands:
- `generate [section]`: Generate content for a resume section (summary, experience, skills, etc.)
- `optimize [resume-id]`: Optimize your resume for ATS systems
- `mock-interview [job-title]`: Start a mock interview session

### `jobs`
Track job applications:

```bash
qwen-cli jobs [command]
```

Commands:
- `add`: Add a new job application
- `list`: List all job applications
- `update [id]`: Update a job application status
- `remove [id]`: Remove a job application

### `auth`
Handle authentication:

```bash
qwen-cli auth [command]
```

Commands:
- `login`: Log in to your account
- `logout`: Log out from your account
- `status`: Check authentication status

## Examples

### Creating a new project
```bash
qwen-cli init my-resume-project
cd my-resume-project
qwen-cli dev
```

### Working with resumes
```bash
# Create a new resume
qwen-cli resume create --title "Software Engineer Resume"

# Generate a professional summary using AI
qwen-cli ai generate summary --resume-id 1

# Export your resume to PDF
qwen-cli resume export 1 --format pdf --output ./my-resume.pdf
```

### Managing job applications
```bash
# Add a new job application
qwen-cli jobs add --company "Tech Corp" --position "Senior Developer" --status applied

# List all job applications
qwen-cli jobs list

# Update the status of an application
qwen-cli jobs update 1 --status interviewing
```

### Database operations
```bash
# Run database migrations
qwen-cli db migrate

# Reset the database (be careful!)
qwen-cli db reset

# Open Prisma Studio
qwen-cli db studio
```

### Starting a mock interview
```bash
qwen-cli ai mock-interview "Frontend Developer"
```

## Advanced Usage

### Environment-specific configurations
You can specify different environments using the `--env` flag:

```bash
qwen-cli dev --env production
qwen-cli build --env staging
```

### Using configuration files
Instead of passing options via command line, you can use a configuration file named `.qwenrc` in your project root:

```json
{
  "frontendPort": 3000,
  "backendPort": 5000,
  "databaseUrl": "postgresql://...",
  "defaultResumeTemplate": "modern",
  "aiProvider": "groq"
}
```

### Script integration
qwen-cli is designed to work well in scripts. Here's an example bash script that automates resume updates:

```bash
#!/bin/bash
echo "Updating resume with latest experience..."

# Add new experience
qwen-cli resume update 1 --add-experience <<EOF
{
  "company": "New Company",
  "position": "Senior Developer",
  "startDate": "2023-01-01",
  "endDate": "present",
  "description": "Developed amazing applications..."
}
EOF

# Optimize the resume for ATS
qwen-cli ai optimize 1

# Export updated resume
qwen-cli resume export 1 --format pdf --output ./updated-resume.pdf

echo "Resume updated and exported!"
```

### Custom templates
You can create custom resume templates and use them with qwen-cli:

```bash
# Create a custom template
qwen-cli resume create-template --name "creative" --from-file ./templates/creative.json

# Use the custom template when creating a resume
qwen-cli resume create --template creative
```

## Troubleshooting

### Common Issues

#### Issue: API Keys not found
**Solution**: Ensure your environment variables are properly set. You can verify this with:
```bash
qwen-cli auth status
```

#### Issue: Database connection errors
**Solution**: Check your `DATABASE_URL` environment variable and ensure your database server is running:
```bash
# For PostgreSQL
sudo systemctl status postgresql
```

#### Issue: Frontend and backend ports conflict
**Solution**: Use custom ports:
```bash
qwen-cli dev --port 8080
```

### Debugging
Enable verbose logging with the `--verbose` flag:
```bash
qwen-cli dev --verbose
```

For more detailed debugging information, set the DEBUG environment variable:
```bash
DEBUG=qwen-cli:* qwen-cli [command]
```

### Getting Help
If you encounter issues not covered here:
1. Check the online documentation at [AI Resume Builder Documentation](https://example.com/docs)
2. Search or create an issue in the GitHub repository
3. Join our community Discord for real-time help

## Contributing

We welcome contributions to qwen-cli! If you'd like to contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

For more information about contributing, see the CONTRIBUTING.md file in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.