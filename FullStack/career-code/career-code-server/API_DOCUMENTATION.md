# Job Portal API Documentation

## Overview
This is a RESTful API for a job portal application that allows employers to post jobs and job seekers to search and apply for jobs.

## Base URL
```
http://localhost:3000
```

## Authentication
Currently, the API uses simple email/password authentication. In production, consider implementing JWT tokens or OAuth.

## API Endpoints

### Root Endpoint
```
GET /
```
Returns API information and available endpoints.

---

## User Management

### Register User
```
POST /api/users/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "jobseeker", // or "employer"
  "skills": ["JavaScript", "React", "Node.js"], // for jobseeker only
  "experience": "2 years", // for jobseeker only
  "company": "Tech Corp" // for employer only
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "userId": "507f1f77bcf86cd799439011"
}
```

### Login User
```
POST /api/users/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "userType": "jobseeker",
    "company": null
  }
}
```

### Get User Profile
```
GET /api/users/:id
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "userType": "jobseeker",
  "skills": ["JavaScript", "React", "Node.js"],
  "experience": "2 years",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---

## Job Management

### Create Job Posting
```
POST /api/jobs
```

**Request Body:**
```json
{
  "title": "Frontend Developer",
  "description": "We are looking for a skilled frontend developer...",
  "company": "Tech Corp",
  "location": "New York, NY",
  "salary": 75000,
  "requirements": ["React", "JavaScript", "CSS"],
  "employerId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "message": "Job posted successfully",
  "jobId": "507f1f77bcf86cd799439012"
}
```

### Get All Jobs (with filters)
```
GET /api/jobs?search=developer&location=new york&salary=50000&page=1&limit=10
```

**Query Parameters:**
- `search` (optional): Search in title, description, and company
- `location` (optional): Filter by location
- `salary` (optional): Minimum salary filter
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 10)

**Response:**
```json
{
  "jobs": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Frontend Developer",
      "description": "We are looking for a skilled frontend developer...",
      "company": "Tech Corp",
      "location": "New York, NY",
      "salary": 75000,
      "requirements": ["React", "JavaScript", "CSS"],
      "employerId": "507f1f77bcf86cd799439011",
      "status": "active",
      "applicants": [],
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 5,
    "total": 50
  }
}
```

### Get Specific Job
```
GET /api/jobs/:id
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Frontend Developer",
  "description": "We are looking for a skilled frontend developer...",
  "company": "Tech Corp",
  "location": "New York, NY",
  "salary": 75000,
  "requirements": ["React", "JavaScript", "CSS"],
  "employerId": "507f1f77bcf86cd799439011",
  "status": "active",
  "applicants": ["507f1f77bcf86cd799439013"],
  "createdAt": "2023-01-01T00:00:00.000Z"
}
```

### Update Job
```
PUT /api/jobs/:id
```

**Request Body:**
```json
{
  "title": "Senior Frontend Developer",
  "description": "Updated job description...",
  "company": "Tech Corp",
  "location": "New York, NY",
  "salary": 85000,
  "requirements": ["React", "JavaScript", "CSS", "TypeScript"]
}
```

**Response:**
```json
{
  "message": "Job updated successfully"
}
```

### Delete Job
```
DELETE /api/jobs/:id
```

**Response:**
```json
{
  "message": "Job deleted successfully"
}
```

### Get Jobs by Employer
```
GET /api/employers/:id/jobs
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Frontend Developer",
    "company": "Tech Corp",
    "status": "active",
    "applicants": ["507f1f77bcf86cd799439013"],
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
]
```

---

## Application Management

### Submit Job Application
```
POST /api/applications
```

**Request Body:**
```json
{
  "jobId": "507f1f77bcf86cd799439012",
  "applicantId": "507f1f77bcf86cd799439013",
  "coverLetter": "I am very interested in this position...",
  "resume": "Link to resume or resume text"
}
```

**Response:**
```json
{
  "message": "Application submitted successfully",
  "applicationId": "507f1f77bcf86cd799439014"
}
```

### Get Applications for a Job
```
GET /api/applications/job/:jobId
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "coverLetter": "I am very interested in this position...",
    "resume": "Link to resume or resume text",
    "status": "pending",
    "appliedAt": "2023-01-01T00:00:00.000Z",
    "applicant": {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "skills": ["React", "JavaScript"],
      "experience": "3 years"
    }
  }
]
```

### Get User's Applications
```
GET /api/applications/user/:userId
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "coverLetter": "I am very interested in this position...",
    "resume": "Link to resume or resume text",
    "status": "pending",
    "appliedAt": "2023-01-01T00:00:00.000Z",
    "job": {
      "title": "Frontend Developer",
      "company": "Tech Corp",
      "location": "New York, NY",
      "salary": 75000
    }
  }
]
```

### Update Application Status
```
PUT /api/applications/:id/status
```

**Request Body:**
```json
{
  "status": "accepted" // or "rejected", "pending"
}
```

**Response:**
```json
{
  "message": "Application status updated successfully"
}
```

---

## Statistics

### Get Dashboard Statistics
```
GET /api/stats/dashboard/:userId
```

**For Employers:**
```json
{
  "totalJobs": 5,
  "totalApplications": 25,
  "activeJobs": 5
}
```

**For Job Seekers:**
```json
{
  "totalApplications": 10,
  "acceptedApplications": 2,
  "pendingApplications": 6
}
```

---

## Error Responses

The API uses standard HTTP status codes and returns error messages in the following format:

```json
{
  "error": "Error message description"
}
```

### Common Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## Example Usage

### 1. Register an Employer
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Corp HR",
    "email": "hr@techcorp.com",
    "password": "password123",
    "userType": "employer",
    "company": "Tech Corp"
  }'
```

### 2. Post a Job
```bash
curl -X POST http://localhost:3000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Full Stack Developer",
    "description": "Looking for an experienced full stack developer",
    "company": "Tech Corp",
    "location": "Remote",
    "salary": 80000,
    "requirements": ["JavaScript", "React", "Node.js", "MongoDB"],
    "employerId": "USER_ID_HERE"
  }'
```

### 3. Search Jobs
```bash
curl "http://localhost:3000/api/jobs?search=developer&location=remote&salary=60000"
```

### 4. Apply for a Job
```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "jobId": "JOB_ID_HERE",
    "applicantId": "APPLICANT_ID_HERE",
    "coverLetter": "I am excited to apply for this position...",
    "resume": "https://myresume.com/resume.pdf"
  }'
```

---

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure MongoDB is running on your system

3. Start the server:
   ```bash
   npm start
   ```
   or for development with auto-restart:
   ```bash
   npm run dev
   ```

4. The server will be running on `http://localhost:3000`

---

## Database Collections

The API uses MongoDB with the following collections:

### users
- User profiles for both employers and job seekers
- Fields: name, email, password, userType, company, skills, experience

### jobs
- Job postings created by employers
- Fields: title, description, company, location, salary, requirements, employerId, status, applicants

### applications
- Job applications submitted by job seekers
- Fields: jobId, applicantId, coverLetter, resume, status, appliedAt

---

## Future Enhancements

1. **Authentication**: Implement JWT tokens for secure authentication
2. **File Upload**: Add file upload capability for resumes
3. **Email Notifications**: Send email notifications for application status updates
4. **Advanced Search**: Add more sophisticated search and filtering options
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Data Validation**: Add comprehensive input validation
7. **Password Hashing**: Hash passwords before storing in database
8. **Admin Panel**: Create admin endpoints for managing users and jobs
