const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';

MongoClient.connect(uri)
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db('job-portal');
  })
  .catch(error => console.error('MongoDB connection error:', error));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Job Portal API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      jobs: '/api/jobs',
      applications: '/api/applications'
    }
  });
});

// User routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password, userType, company, skills, experience } = req.body;
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = {
      name,
      email,
      password, // In production, hash this password
      userType, // 'employer' or 'jobseeker'
      company: userType === 'employer' ? company : null,
      skills: userType === 'jobseeker' ? skills : null,
      experience: userType === 'jobseeker' ? experience : null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('users').insertOne(user);
    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: result.insertedId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await db.collection('users').findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({ 
      message: 'Login successful', 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        company: user.company
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Job routes
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, description, company, location, salary, requirements, employerId } = req.body;
    
    const job = {
      title,
      description,
      company,
      location,
      salary,
      requirements,
      employerId: new ObjectId(employerId),
      status: 'active',
      applicants: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('jobs').insertOne(job);
    res.status(201).json({ 
      message: 'Job posted successfully', 
      jobId: result.insertedId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const { search, location, salary, page = 1, limit = 10 } = req.query;
    const query = { status: 'active' };

    // Add search filters
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (salary) {
      query.salary = { $gte: parseInt(salary) };
    }

    const skip = (page - 1) * limit;
    const jobs = await db.collection('jobs')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();

    const total = await db.collection('jobs').countDocuments(query);

    res.json({
      jobs,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await db.collection('jobs').findOne({ _id: new ObjectId(req.params.id) });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/jobs/:id', async (req, res) => {
  try {
    const { title, description, company, location, salary, requirements } = req.body;
    
    const result = await db.collection('jobs').updateOne(
      { _id: new ObjectId(req.params.id) },
      { 
        $set: { 
          title, 
          description, 
          company, 
          location, 
          salary, 
          requirements,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    const result = await db.collection('jobs').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status: 'deleted', updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get jobs by employer
app.get('/api/employers/:id/jobs', async (req, res) => {
  try {
    const jobs = await db.collection('jobs')
      .find({ employerId: new ObjectId(req.params.id) })
      .sort({ createdAt: -1 })
      .toArray();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Application routes
app.post('/api/applications', async (req, res) => {
  try {
    const { jobId, applicantId, coverLetter, resume } = req.body;
    
    // Check if application already exists
    const existingApplication = await db.collection('applications').findOne({
      jobId: new ObjectId(jobId),
      applicantId: new ObjectId(applicantId)
    });

    if (existingApplication) {
      return res.status(400).json({ error: 'Already applied for this job' });
    }

    const application = {
      jobId: new ObjectId(jobId),
      applicantId: new ObjectId(applicantId),
      coverLetter,
      resume,
      status: 'pending',
      appliedAt: new Date()
    };

    const result = await db.collection('applications').insertOne(application);

    // Add applicant to job's applicants array
    await db.collection('jobs').updateOne(
      { _id: new ObjectId(jobId) },
      { $push: { applicants: new ObjectId(applicantId) } }
    );

    res.status(201).json({ 
      message: 'Application submitted successfully', 
      applicationId: result.insertedId 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/applications/job/:jobId', async (req, res) => {
  try {
    const applications = await db.collection('applications').aggregate([
      { $match: { jobId: new ObjectId(req.params.jobId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'applicantId',
          foreignField: '_id',
          as: 'applicant'
        }
      },
      { $unwind: '$applicant' },
      {
        $project: {
          _id: 1,
          coverLetter: 1,
          resume: 1,
          status: 1,
          appliedAt: 1,
          'applicant.name': 1,
          'applicant.email': 1,
          'applicant.skills': 1,
          'applicant.experience': 1
        }
      }
    ]).toArray();

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/applications/user/:userId', async (req, res) => {
  try {
    const applications = await db.collection('applications').aggregate([
      { $match: { applicantId: new ObjectId(req.params.userId) } },
      {
        $lookup: {
          from: 'jobs',
          localField: 'jobId',
          foreignField: '_id',
          as: 'job'
        }
      },
      { $unwind: '$job' },
      {
        $project: {
          _id: 1,
          coverLetter: 1,
          resume: 1,
          status: 1,
          appliedAt: 1,
          'job.title': 1,
          'job.company': 1,
          'job.location': 1,
          'job.salary': 1
        }
      }
    ]).toArray();

    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/applications/:id/status', async (req, res) => {
  try {
    const { status } = req.body; // 'pending', 'accepted', 'rejected'
    
    const result = await db.collection('applications').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Statistics routes
app.get('/api/stats/dashboard/:userId', async (req, res) => {
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.userId) });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let stats = {};

    if (user.userType === 'employer') {
      // Employer stats
      const totalJobs = await db.collection('jobs').countDocuments({ 
        employerId: new ObjectId(req.params.userId),
        status: 'active'
      });
      
      const totalApplications = await db.collection('applications').countDocuments({
        jobId: { 
          $in: (await db.collection('jobs').find({ 
            employerId: new ObjectId(req.params.userId) 
          }).toArray()).map(job => job._id)
        }
      });

      stats = {
        totalJobs,
        totalApplications,
        activeJobs: totalJobs
      };
    } else {
      // Job seeker stats
      const totalApplications = await db.collection('applications').countDocuments({
        applicantId: new ObjectId(req.params.userId)
      });

      const acceptedApplications = await db.collection('applications').countDocuments({
        applicantId: new ObjectId(req.params.userId),
        status: 'accepted'
      });

      const pendingApplications = await db.collection('applications').countDocuments({
        applicantId: new ObjectId(req.params.userId),
        status: 'pending'
      });

      stats = {
        totalApplications,
        acceptedApplications,
        pendingApplications
      };
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(port, () => {
  console.log(`Job Portal Server is running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('- POST /api/users/register - Register new user');
  console.log('- POST /api/users/login - User login');
  console.log('- GET /api/users/:id - Get user profile');
  console.log('- POST /api/jobs - Create new job posting');
  console.log('- GET /api/jobs - Get all jobs with filters');
  console.log('- GET /api/jobs/:id - Get specific job');
  console.log('- PUT /api/jobs/:id - Update job');
  console.log('- DELETE /api/jobs/:id - Delete job');
  console.log('- POST /api/applications - Submit job application');
  console.log('- GET /api/applications/job/:jobId - Get applications for a job');
  console.log('- GET /api/applications/user/:userId - Get user applications');
  console.log('- PUT /api/applications/:id/status - Update application status');
});
