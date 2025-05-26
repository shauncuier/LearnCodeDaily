import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
});
app.use('/api', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Career Code API is running',
    timestamp: new Date().toISOString(),
    version: process.env.APP_VERSION || '1.0.0',
  });
});

// API routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to Career Code API',
    version: process.env.API_VERSION || 'v1',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      jobs: '/api/jobs',
      applications: '/api/applications',
      upload: '/api/upload',
      stats: '/api/stats',
    },
  });
});

// Placeholder route handlers (to be implemented)
app.use('/api/auth', (req, res) => {
  res.json({ message: 'Auth routes - Coming soon' });
});

app.use('/api/users', (req, res) => {
  res.json({ message: 'User routes - Coming soon' });
});

app.use('/api/jobs', (req, res) => {
  res.json({ 
    message: 'Job routes - Coming soon',
    jobs: [
      {
        _id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        description: 'Join our team as a Senior Frontend Developer and work on cutting-edge web applications.',
        requirements: ['React', 'TypeScript', 'Node.js'],
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        featured: true
      },
      {
        _id: '2',
        title: 'Product Manager',
        company: 'Innovation Labs',
        location: 'New York, NY',
        type: 'Full-time',
        salary: '$110,000 - $140,000',
        description: 'Lead product strategy and development for our flagship products.',
        requirements: ['Product Management', 'Analytics', 'Leadership'],
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        createdAt: new Date(),
        featured: true
      }
    ],
    totalJobs: 1250,
    companies: 350,
    candidates: 15000,
    placements: 8500
  });
});

app.use('/api/applications', (req, res) => {
  res.json({ message: 'Application routes - Coming soon' });
});

app.use('/api/upload', (req, res) => {
  res.json({ message: 'Upload routes - Coming soon' });
});

app.use('/api/stats', (req, res) => {
  res.json({ message: 'Stats routes - Coming soon' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 Career Code API Server is running!
📍 Environment: ${process.env.NODE_ENV || 'development'}
🌐 Server: http://localhost:${PORT}
📡 API: http://localhost:${PORT}/api
💚 Health: http://localhost:${PORT}/health
  `);
});

export default app;
