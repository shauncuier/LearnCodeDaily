# Career Code - Modern Job Portal

A full-stack job portal application built with React, Node.js, Express, and MongoDB. Features include job posting, application management, Firebase authentication, and a modern responsive UI.

## 🚀 Features

### For Job Seekers
- **Smart Job Search** - Advanced filtering and search capabilities
- **Easy Application Process** - Apply with saved profiles and documents
- **Application Tracking** - Monitor application status and progress
- **Profile Management** - Comprehensive profile with resume, skills, and experience
- **Job Alerts** - Get notified about relevant opportunities

### For Employers
- **Job Posting** - Create detailed job listings with rich descriptions
- **Application Management** - Review, filter, and manage applications
- **Interview Scheduling** - Built-in interview management system
- **Candidate Scoring** - Rate and evaluate candidates
- **Company Branding** - Showcase company information and culture

### General Features
- **Firebase Authentication** - Secure login with Google OAuth
- **Responsive Design** - Mobile-first, modern UI
- **Real-time Updates** - Live notifications and status updates
- **File Upload** - Resume and document management
- **Email Integration** - Automated notifications
- **Advanced Search** - Full-text search with filters
- **SEO Optimized** - Server-side rendering and meta tags

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **React Hook Form** - Form validation and management
- **React Hot Toast** - Beautiful notifications
- **React Icons** - Icon library
- **React Helmet Async** - SEO and meta tag management
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **Firebase** - Authentication and file storage

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger
- **Express Rate Limit** - Rate limiting
- **Multer** - File upload handling
- **Nodemailer** - Email sending
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (v4.4 or higher)
- [Git](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/career-code.git
cd career-code
```

### 2. Setup Backend

```bash
# Navigate to server directory
cd job-portal-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit the .env file with your configurations
nano .env
```

**Required Environment Variables:**
```env
# Database
MONGO_URI=mongodb://localhost:27017/job-portal

# JWT Secret (generate a secure random string)
JWT_SECRET=your_super_secret_jwt_key_here

# JWT Expires In
JWT_EXPIRES_IN=30d

# Node Environment
NODE_ENV=development

# Server Port
PORT=5000

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Client URL
CLIENT_URL=http://localhost:3000
```

```bash
# Start the server
npm run dev
```

The server will start on http://localhost:5000

### 3. Setup Frontend

```bash
# Navigate to client directory (from root)
cd job-portal-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit the .env file with your Firebase configuration
nano .env
```

**Required Environment Variables:**
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# API Base URL
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
# Start the client
npm run dev
```

The client will start on http://localhost:3000

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication with Email/Password and Google providers
4. Enable Firestore Database
5. Enable Storage
6. Copy the configuration to your `.env` file

## 📁 Project Structure

```
career-code/
├── job-portal-client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── layout/        # Layout components
│   │   │   └── ui/            # UI components
│   │   ├── contexts/          # React contexts
│   │   ├── firebase/          # Firebase configuration
│   │   ├── pages/             # Page components
│   │   │   ├── auth/          # Authentication pages
│   │   │   ├── jobs/          # Job-related pages
│   │   │   ├── applications/  # Application pages
│   │   │   └── user/          # User profile pages
│   │   ├── services/          # API services
│   │   └── utils/             # Utility functions
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── job-portal-server/          # Node.js backend
│   ├── models/                # MongoDB models
│   ├── routes/                # Express routes
│   ├── middleware/            # Custom middleware
│   ├── controllers/           # Route controllers
│   ├── utils/                 # Utility functions
│   ├── uploads/               # File uploads
│   ├── package.json
│   └── server.js
├── README.md
└── PROJECT_SUMMARY.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Reset password

### Jobs
- `GET /api/jobs` - Get all jobs (with filters)
- `GET /api/jobs/:id` - Get job by ID
- `POST /api/jobs` - Create new job (auth required)
- `PUT /api/jobs/:id` - Update job (auth required)
- `DELETE /api/jobs/:id` - Delete job (auth required)
- `GET /api/jobs/my-jobs` - Get user's posted jobs (auth required)
- `GET /api/jobs/search` - Search jobs

### Applications
- `POST /api/applications/:jobId/apply` - Apply for job (auth required)
- `GET /api/applications/my-applications` - Get user's applications (auth required)
- `GET /api/applications/job/:jobId` - Get job applications (auth required)
- `PUT /api/applications/:id/status` - Update application status (auth required)
- `DELETE /api/applications/:id` - Delete application (auth required)

## 🧪 Development

### Running Tests
```bash
# Backend tests
cd job-portal-server
npm test

# Frontend tests
cd job-portal-client
npm test
```

### Code Formatting
```bash
# Format code with Prettier
npm run format

# Lint code with ESLint
npm run lint
```

### Building for Production
```bash
# Build frontend
cd job-portal-client
npm run build

# Build backend (if needed)
cd job-portal-server
npm run build
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in deployment platform

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Deploy the server code
3. Ensure MongoDB connection

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use secure JWT secret
- Configure production database
- Set up production email service
- Configure CORS for production domains

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access for MongoDB Atlas

**Firebase Authentication Error**
- Check Firebase configuration
- Ensure Firebase project is active
- Verify API keys and domain settings

**CORS Error**
- Check server CORS configuration
- Verify client URL in server settings
- Ensure proper origin headers

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@careercode.com
- Documentation: [Wiki](https://github.com/your-username/career-code/wiki)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - Frontend framework
- [Express.js](https://expressjs.com/) - Backend framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Firebase](https://firebase.google.com/) - Authentication and storage
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool

---

**Happy Coding! 🎉**
