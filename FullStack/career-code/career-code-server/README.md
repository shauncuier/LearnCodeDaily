# Job Portal Server

A comprehensive RESTful API server for a job portal application built with Node.js, Express, and MongoDB. This server enables employers to post jobs and job seekers to search and apply for positions.

## Features

### 🏢 For Employers
- Register and manage employer accounts
- Post, edit, and delete job listings
- View applications for posted jobs
- Update application status (accept/reject)
- Dashboard with statistics

### 👔 For Job Seekers
- Register and manage job seeker profiles
- Search and filter job listings
- Apply for jobs with cover letters
- Track application status
- Personal dashboard with application history

### 🔍 Search & Filter
- Search jobs by title, company, or description
- Filter by location and minimum salary
- Pagination support for large result sets

### 📊 Analytics
- Dashboard statistics for both user types
- Application tracking and status management

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Security**: CORS enabled
- **Environment**: dotenv for configuration

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or connection string to remote instance)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd career-code-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already configured with default values:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/job-portal
   NODE_ENV=development
   ```
   
   Update `MONGODB_URI` if you're using a different MongoDB connection.

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system. If using local MongoDB:
   ```bash
   # On macOS (with Homebrew)
   brew services start mongodb-community
   
   # On Windows
   net start MongoDB
   
   # On Linux
   sudo systemctl start mongod
   ```

5. **Seed the database with sample data (optional)**
   ```bash
   npm run seed
   ```
   
   This will create sample users, jobs, and applications for testing.

6. **Start the server**
   ```bash
   # Production mode
   npm start
   
   # Development mode (auto-restart on changes)
   npm run dev
   ```

7. **Access the API**
   
   The server will be running at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/:id` - Get user profile

### Job Management
- `POST /api/jobs` - Create job posting
- `GET /api/jobs` - Get all jobs (with search/filter)
- `GET /api/jobs/:id` - Get specific job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/employers/:id/jobs` - Get jobs by employer

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications/job/:jobId` - Get applications for job
- `GET /api/applications/user/:userId` - Get user's applications
- `PUT /api/applications/:id/status` - Update application status

### Statistics
- `GET /api/stats/dashboard/:userId` - Get dashboard stats

## Sample Data

After running `npm run seed`, you can use these test accounts:

### Employers
- **Tech Corp**: hr@techcorp.com / password123
- **Startup Inc**: hr@startup.com / password123

### Job Seekers
- **John Doe**: john@example.com / password123 (JavaScript, React, Node.js)
- **Jane Smith**: jane@example.com / password123 (Python, Django, PostgreSQL)
- **Mike Johnson**: mike@example.com / password123 (Java, Spring Boot, MySQL)

## API Testing Examples

### Register a new user
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "userType": "jobseeker",
    "skills": ["JavaScript", "React"],
    "experience": "2 years"
  }'
```

### Search for jobs
```bash
curl "http://localhost:3000/api/jobs?search=developer&location=remote&salary=60000"
```

### Apply for a job
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "JOB_ID_HERE",
    "applicantId": "USER_ID_HERE",
    "coverLetter": "I am interested in this position...",
    "resume": "https://example.com/resume.pdf"
  }'
```

## Project Structure

```
career-code-server/
├── server.js              # Main server file with all routes
├── seed.js                # Database seeding script
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── README.md              # This file
└── API_DOCUMENTATION.md   # Detailed API documentation
```

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String, // In production, should be hashed
  userType: String, // 'employer' or 'jobseeker'
  company: String,  // For employers only
  skills: [String], // For job seekers only
  experience: String, // For job seekers only
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  company: String,
  location: String,
  salary: Number,
  requirements: [String],
  employerId: ObjectId,
  status: String, // 'active' or 'deleted'
  applicants: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Applications Collection
```javascript
{
  _id: ObjectId,
  jobId: ObjectId,
  applicantId: ObjectId,
  coverLetter: String,
  resume: String,
  status: String, // 'pending', 'accepted', 'rejected'
  appliedAt: Date
}
```

## Development

### Available Scripts
- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with auto-restart
- `npm run seed` - Seed the database with sample data

### Adding New Features
1. Add new routes in `server.js`
2. Update API documentation in `API_DOCUMENTATION.md`
3. Add sample data in `seed.js` if needed
4. Test the new endpoints

## Production Considerations

Before deploying to production, consider implementing:

1. **Security Enhancements**
   - Password hashing (bcrypt)
   - JWT authentication
   - Input validation and sanitization
   - Rate limiting
   - HTTPS enforcement

2. **Performance**
   - Database indexing
   - Caching layer (Redis)
   - Compression middleware
   - Database connection pooling

3. **Monitoring**
   - Logging (Winston)
   - Error tracking (Sentry)
   - Performance monitoring
   - Health check endpoints

4. **Deployment**
   - Environment-specific configurations
   - Docker containerization
   - CI/CD pipeline
   - Database migrations

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify network connectivity

**Port Already in Use**
- Change the PORT in `.env` file
- Kill the process using the port: `lsof -ti:3000 | xargs kill`

**Dependencies Issues**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For questions or support, please refer to the API documentation or create an issue in the repository.
