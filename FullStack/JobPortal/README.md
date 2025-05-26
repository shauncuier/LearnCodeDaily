# 🚀 CAREER-CODE: Complete Job Portal System

A modern, full-stack job portal platform that connects job seekers with employers. Built with React.js frontend and Node.js backend, featuring Firebase authentication, MongoDB database, and modern UI/UX design.

![Career Code Banner](https://img.shields.io/badge/Career-Code-blue?style=for-the-badge)
![Full Stack](https://img.shields.io/badge/Full_Stack-Application-green?style=for-the-badge)

## 🌟 Project Overview

**CAREER-CODE** is a comprehensive job portal system designed to streamline the recruitment process for both job seekers and employers. The platform offers an intuitive interface for job posting, searching, applying, and managing applications with real-time updates and notifications.

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│   Node.js API   │───▶│   MongoDB DB    │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Firebase      │    │   JWT & Auth    │    │   File Storage  │
│   (Auth)        │    │   (Security)    │    │   (Cloudinary)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Features Breakdown

### 🎨 Frontend Features (React.js)
- **Modern UI/UX**: Responsive design with Tailwind CSS and DaisyUI
- **Authentication**: Firebase Auth with Google Sign-in
- **Job Management**: CRUD operations for job postings
- **Application System**: Apply for jobs and track applications
- **Search & Filter**: Advanced job search with multiple filters
- **Real-time Updates**: Live notifications and status updates
- **Responsive Design**: Mobile-first approach
- **SEO Optimized**: Meta tags and structured data

### 🔧 Backend Features (Node.js)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based authentication with Firebase Admin SDK
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Cloudinary integration for resume uploads
- **Email Service**: Nodemailer for notifications
- **Security**: Helmet, CORS, Rate limiting
- **Validation**: Express-validator for input validation
- **Error Handling**: Comprehensive error management

## 🛠️ Technology Stack

### Frontend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 19.1.0 | Frontend framework |
| Tailwind CSS | 3.4.0 | Utility-first CSS |
| DaisyUI | 4.5.0 | Component library |
| Framer Motion | 10.16.16 | Animations |
| React Router | 7.6.1 | Client-side routing |
| React Query | 3.39.3 | Data fetching |
| Axios | 1.6.7 | HTTP client |
| Firebase | 10.7.1 | Authentication |

### Backend Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | 8.0.3 | Database |
| Mongoose | 8.0.3 | ODM |
| Firebase Admin | 12.0.0 | Authentication |
| JWT | 9.0.2 | Token management |
| Cloudinary | 1.41.0 | File storage |
| Nodemailer | 6.9.7 | Email service |

### Development Tools
- **Vite**: Fast build tool
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Nodemon**: Auto-restart server
- **Jest**: Testing framework

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- Firebase project
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd JobPortal
```

### 2. Setup Backend
```bash
cd job-portal-server
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```

### 3. Setup Frontend
```bash
cd ../job-portal-client
npm install
cp .env.example .env
# Configure your Firebase settings
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/health

## 📁 Project Structure

```
JobPortal/
├── job-portal-client/          # React.js Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── layout/        # Layout components
│   │   │   └── ui/            # UI components
│   │   ├── contexts/          # React contexts
│   │   ├── pages/             # Page components
│   │   │   ├── auth/          # Auth pages
│   │   │   ├── jobs/          # Job pages
│   │   │   ├── applications/  # Application pages
│   │   │   └── user/          # User pages
│   │   ├── services/          # API services
│   │   ├── firebase/          # Firebase config
│   │   └── utils/             # Utility functions
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── job-portal-server/          # Node.js Backend
│   ├── controllers/           # Route controllers
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── utils/                # Utility functions
│   ├── config/               # Configuration files
│   ├── package.json
│   └── server.js
└── README.md                  # This file
```

## 🔧 Configuration

### Frontend Environment Variables
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend Environment Variables
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/career-code
JWT_SECRET=your_jwt_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
```

## 🎯 Key Features Implementation

### Authentication Flow
1. **Registration**: Email/password or Google OAuth
2. **Login**: Secure authentication with JWT tokens
3. **Protected Routes**: Access control for authenticated users
4. **Session Management**: Automatic token refresh

### Job Management
1. **Create Jobs**: Employers can post new positions
2. **Search Jobs**: Advanced filtering and search
3. **Apply for Jobs**: Streamlined application process
4. **Track Applications**: Real-time status updates

### Application Process
1. **Submit Application**: Upload resume and cover letter
2. **Application Review**: Employer review interface
3. **Status Updates**: Automated notifications
4. **Communication**: In-app messaging system

## 📱 Responsive Design

- **Mobile**: Optimized for smartphones (320px+)
- **Tablet**: Tablet-friendly layout (768px+)
- **Desktop**: Full desktop experience (1024px+)
- **Large Screens**: Enhanced for large displays (1280px+)

## 🔒 Security Features

- **Authentication**: Firebase Auth + JWT
- **Authorization**: Role-based access control
- **Data Validation**: Input sanitization and validation
- **Rate Limiting**: API request limiting
- **CORS**: Cross-origin request security
- **Helmet**: Security headers
- **Password Hashing**: Bcrypt encryption

## 🧪 Testing

### Frontend Testing
```bash
cd job-portal-client
npm run test
```

### Backend Testing
```bash
cd job-portal-server
npm run test
```

## 📈 Performance Optimization

- **Code Splitting**: Lazy loading of components
- **Image Optimization**: Responsive images
- **Caching**: API response caching
- **Compression**: Gzip compression
- **Bundle Analysis**: Webpack bundle analyzer

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy to hosting platform
3. Configure environment variables

### Backend (Heroku/Railway/DigitalOcean)
1. Set up production database
2. Configure environment variables
3. Deploy using platform-specific methods

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📋 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Job Endpoints
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Application Endpoints
- `POST /api/applications/:jobId` - Apply for job
- `GET /api/applications/user` - Get user applications
- `GET /api/applications/job/:jobId` - Get job applications
- `PATCH /api/applications/:id/status` - Update application status

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Configuration**
   - Ensure all Firebase keys are correctly set
   - Check Firebase project settings

2. **Database Connection**
   - Verify MongoDB connection string
   - Check network connectivity

3. **CORS Issues**
   - Configure allowed origins in backend
   - Check client URL configuration

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check for version compatibility

## 📞 Support

For support and questions:
- **Email**: support@careercode.com
- **Documentation**: Check inline code comments
- **Issues**: Open GitHub issue

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the amazing ecosystem
- Tailwind CSS for the design system
- Firebase for authentication services
- MongoDB for the database solution
- All open-source contributors

---

**Made with ❤️ for connecting talent with opportunities**

🌟 **Star this repository if you found it helpful!**
