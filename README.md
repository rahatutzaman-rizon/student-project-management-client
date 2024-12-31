# Student Project Management System

A MERN stack application for managing student projects, facilitating teacher-student communication, and tracking academic progress.

## Features

- Authentication using JWT
- Real-time email notifications via Nodemailer
- Dashboard analytics for students and teachers
- Project group management
- Task assignment and tracking
- Performance evaluation system
- Progress monitoring
- Result publication

## Tech Stack

- **Frontend:**
  - React.js
  - TanStack Query for data fetching
  - Tailwind CSS
  - React Router DOM

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication
  - Nodemailer

## Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/student-project-management
cd student-project-management
```

2. Install dependencies:
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

3. Environment setup:
```bash
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

# Frontend .env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Projects
- GET `/api/projects`
- POST `/api/projects`
- PUT `/api/projects/:id`
- DELETE `/api/projects/:id`

### Tasks
- GET `/api/tasks`
- POST `/api/tasks`
- PUT `/api/tasks/:id`

### Users
- GET `/api/users`
- GET `/api/users/:id`
- PUT `/api/users/:id`

## Database Schema

### User
```javascript
{
  name: String,
  email: String,
  password: String,
  role: ['student', 'teacher'],
  group: ObjectId
}
```

### Project
```javascript
{
  title: String,
  description: String,
  group: ObjectId,
  teacher: ObjectId,
  tasks: [ObjectId],
  progress: Number,
  marks: Number
}
```

### Task
```javascript
{
  title: String,
  description: String,
  deadline: Date,
  status: String,
  assignedTo: [ObjectId]
}
```

## Running the Application

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

Access the application at `http://localhost:5173`

## Email Configuration

The system uses Nodemailer for email notifications. Configure SMTP settings in `backend/config/mail.config.js`:

```javascript
{
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
}
```