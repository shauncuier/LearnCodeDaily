import axios from 'axios';
import { auth } from '../firebase/config';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response?.status === 401) {
      toast.error('Authentication failed. Please sign in again.');
      // Optionally redirect to login page
    } else if (response?.status === 403) {
      toast.error('You do not have permission to perform this action.');
    } else if (response?.status === 404) {
      toast.error('Resource not found.');
    } else if (response?.status >= 500) {
      toast.error('Server error. Please try again later.');
    } else if (error.code === 'NETWORK_ERROR') {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Job API endpoints
export const jobAPI = {
  // Get all jobs with optional filters
  getJobs: async (params = {}) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  // Get job by ID
  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Create new job
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData);
    return response.data;
  },

  // Update job
  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData);
    return response.data;
  },

  // Delete job
  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // Get jobs by employer
  getJobsByEmployer: async (employerId) => {
    const response = await api.get(`/jobs/employer/${employerId}`);
    return response.data;
  },

  // Search jobs
  searchJobs: async (query, filters = {}) => {
    const response = await api.get('/jobs/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  }
};

// Application API endpoints
export const applicationAPI = {
  // Apply for a job
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/applications/${jobId}`, applicationData);
    return response.data;
  },

  // Get user's applications
  getUserApplications: async () => {
    const response = await api.get('/applications/user');
    return response.data;
  },

  // Get applications for a job
  getJobApplications: async (jobId) => {
    const response = await api.get(`/applications/job/${jobId}`);
    return response.data;
  },

  // Update application status
  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.patch(`/applications/${applicationId}/status`, { status });
    return response.data;
  },

  // Withdraw application
  withdrawApplication: async (applicationId) => {
    const response = await api.delete(`/applications/${applicationId}`);
    return response.data;
  },

  // Get application by ID
  getApplicationById: async (applicationId) => {
    const response = await api.get(`/applications/${applicationId}`);
    return response.data;
  }
};

// User API endpoints
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },

  // Create or update user on first login
  createOrUpdateUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  }
};

// Statistics API endpoints
export const statsAPI = {
  // Get dashboard stats
  getDashboardStats: async () => {
    const response = await api.get('/stats/dashboard');
    return response.data;
  },

  // Get job stats
  getJobStats: async (jobId) => {
    const response = await api.get(`/stats/job/${jobId}`);
    return response.data;
  }
};

// Upload API endpoints
export const uploadAPI = {
  // Upload file (resume, profile picture, etc.)
  uploadFile: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export default api;
