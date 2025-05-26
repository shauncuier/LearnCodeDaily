# 🚀 CAREER-CODE: A Modern Job Portal System

A comprehensive job portal platform designed to enable seamless interaction between job seekers and employers. Built with React.js, Tailwind CSS, and Firebase Authentication.

![Career Code](https://img.shields.io/badge/Career-Code-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase)

## 🌟 Project Purpose

The purpose of this project is to assess skills, creativity, and problem-solving abilities while providing an efficient recruitment and job application experience.

## ✨ Key Features

### 🎨 Design & User Experience
- **Responsive Design**: Fully responsive across mobile, tablet, and desktop
- **Modern UI**: Clean, professional interface with smooth animations
- **Dark/Light Theme**: Automatic theme switching support
- **Accessibility**: WCAG compliant design

### 🔐 Authentication System
- **Email/Password Authentication**: Secure user registration and login
- **Google Authentication**: One-click sign-in with Google
- **Password Recovery**: Email-based password reset functionality
- **Protected Routes**: Secure access to authenticated pages only
- **Session Management**: JWT-based secure session handling

### 💼 Job Management
- **Full CRUD Operations**: Create, read, update, and delete job postings
- **Advanced Search**: Search jobs by title, company, and keywords
- **Smart Filters**: Filter by job type, experience level, salary range
- **Sort Functionality**: Sort by application deadline, date posted
- **Featured Jobs**: Highlight premium job opportunities

### 📋 Application Process
- **Easy Application**: Streamlined job application forms
- **Application Tracking**: View and manage submitted applications
- **Status Updates**: Real-time application status notifications
- **Withdrawal Option**: Ability to withdraw applications

### 👨‍💼 Employer Tools
- **Job Posting**: Create and manage job listings
- **Application Review**: Review and manage job applications
- **Status Management**: Update application status (Rejected, Shortlisted, Hired, Scheduled)
- **Analytics**: View job posting performance metrics

## 🖥️ Application Pages

### Public Pages
- **Home Page (/)**: Landing page with featured jobs and search functionality
- **Login/Register**: Authentication pages with Google integration

### Protected Pages
- **All Jobs (/jobs)**: Browse all available positions with filters
- **Job Details (/jobs/details/:id)**: Detailed job information and application
- **Add Job (/add-jobs)**: Create new job postings (Employers)
- **My Jobs (/my-jobs)**: Manage posted jobs (Employers)
- **My Applications (/application/me)**: Track job applications (Job Seekers)
- **Apply Job (/application/apply/:id)**: Submit job applications
- **Update Job (/jobs/update/:id)**: Edit existing job postings
- **Review Applications (/my-jobs/:id)**: Review job applications (Employers)
- **Profile (/profile)**: User profile management

## 🛠️ Technologies Used

### Frontend
- **React.js 19.1.0**: Modern JavaScript library for building user interfaces
- **Tailwind CSS 3.4.0**: Utility-first CSS framework
- **DaisyUI 4.5.0**: Component library for Tailwind CSS
- **Framer Motion 10.16.16**: Animation library for React
- **React Router DOM 7.6.1**: Client-side routing
- **React Query 3.39.3**: Data fetching and caching
- **React Hook Form 7.48.2**: Form management
- **React Hot Toast 2.4.1**: Toast notifications

### Backend Integration
- **Axios 1.6.7**: HTTP client for API requests
- **Firebase 10.7.1**: Authentication and backend services

### Development Tools
- **Vite 6.3.5**: Fast build tool and development server
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JobPortal/job-portal-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📂 Project Structure

```
job-portal-client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   ├── layout/        # Layout components (Navbar, Footer)
│   │   └── ui/            # UI components (LoadingSpinner, etc.)
│   ├── contexts/          # React contexts (AuthContext)
│   ├── firebase/          # Firebase configuration
│   ├── pages/             # Page components
│   │   ├── auth/          # Authentication pages
│   │   ├── jobs/          # Job-related pages
│   │   ├── applications/  # Application pages
│   │   └── user/          # User profile pages
│   ├── services/          # API services
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (#3b82f6 to #2563eb)
- **Secondary**: Purple (#d946ef)
- **Accent**: Green (#10b981)
- **Neutral**: Gray shades
- **Status Colors**: Success, Warning, Error, Info

### Typography
- **Headings**: Poppins font family
- **Body Text**: Inter font family
- **Font Sizes**: Responsive scale from 12px to 72px

### Components
- **Buttons**: Primary, Secondary, Outline variants
- **Forms**: Consistent input styling with validation states
- **Cards**: Elevated design with hover effects
- **Badges**: Status and category indicators

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level access control
- **Input Validation**: Client and server-side validation
- **XSS Protection**: Sanitized user inputs
- **HTTPS**: Secure data transmission

## 📱 Responsive Design

- **Mobile First**: Designed for mobile devices first
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Grid**: CSS Grid and Flexbox layout
- **Touch Friendly**: Optimized for touch interactions

## 🚀 Performance Optimization

- **Lazy Loading**: Code splitting for faster initial load
- **Image Optimization**: Responsive images with proper formats
- **Caching**: API response caching with React Query
- **Bundle Optimization**: Tree shaking and minification

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📈 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on git push

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Career Code Team**
- Website: [Career Code](https://career-code.com)
- Email: info@careercode.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Firebase for backend services
- All contributors and supporters

---

Made with ❤️ for career growth and professional development.
