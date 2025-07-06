import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../components/ui/Helmet';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { jobsAPI } from '../services/api';
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiEye, 
  FiUsers, 
  FiMapPin, 
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiCalendar
} from 'react-icons/fi';

const MyJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (user && user.role === 'employer') {
      fetchMyJobs();
    }
  }, [user]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getMyJobs();
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching my jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return;
    }

    setDeleting(jobId);
    try {
      await jobsAPI.deleteJob(jobId);
      setJobs(jobs.filter(job => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const formatSalary = (salary) => {
    if (!salary.min && !salary.max) return 'Not specified';
    
    const format = (amount) => {
      if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
      if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
      return amount.toString();
    };

    const period = salary.period === 'yearly' ? '/year' : `/${salary.period}`;
    
    if (salary.min && salary.max) {
      return `$${format(salary.min)} - $${format(salary.max)}${period}`;
    } else if (salary.min) {
      return `$${format(salary.min)}+ ${period}`;
    } else {
      return `Up to $${format(salary.max)}${period}`;
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || user.role !== 'employer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only employers can access this page.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-500">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet 
        title="My Jobs"
        description="Manage your job postings, view applications, and track hiring progress."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Jobs</h1>
                <p className="text-lg text-gray-600">
                  Manage your job postings and track applications
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  to="/add-job"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiPlus className="w-5 h-5 mr-2" />
                  Post New Job
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FiBriefcase className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 mb-6">Start by posting your first job to attract top talent.</p>
              <Link
                to="/add-job"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="w-5 h-5 mr-2" />
                Post Your First Job
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FiBriefcase className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">{jobs.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <FiEye className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {jobs.filter(job => job.status === 'active').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <FiUsers className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {jobs.reduce((total, job) => total + (job.applicationsCount || 0), 0)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <FiClock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Draft Jobs</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {jobs.filter(job => job.status === 'draft').length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs List */}
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div key={job._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600">{job.company.name}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4">
                          <div className="flex items-center">
                            <FiMapPin className="w-4 h-4 mr-1" />
                            {job.location.type === 'remote' ? 'Remote' : 
                             `${job.location.city || ''} ${job.location.state || ''}`.trim() || 'Location not specified'}
                          </div>
                          <div className="flex items-center">
                            <FiBriefcase className="w-4 h-4 mr-1" />
                            {job.employment.type}
                          </div>
                          <div className="flex items-center">
                            <FiDollarSign className="w-4 h-4 mr-1" />
                            {formatSalary(job.salary)}
                          </div>
                          <div className="flex items-center">
                            <FiUsers className="w-4 h-4 mr-1" />
                            {job.applicationsCount || 0} applications
                          </div>
                          <div className="flex items-center">
                            <FiClock className="w-4 h-4 mr-1" />
                            Posted {getTimeAgo(job.createdAt)}
                          </div>
                        </div>

                        <p className="text-gray-700 line-clamp-2 mb-4">
                          {job.description.substring(0, 200)}...
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <FiEye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                        
                        <Link
                          to={`/jobs/${job._id}/applications`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <FiUsers className="w-4 h-4 mr-1" />
                          Applications ({job.applicationsCount || 0})
                        </Link>
                        
                        <Link
                          to={`/jobs/${job._id}/edit`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <FiEdit3 className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                        
                        <button
                          onClick={() => handleDeleteJob(job._id)}
                          disabled={deleting === job._id}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deleting === job._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                          ) : (
                            <FiTrash2 className="w-4 h-4 mr-1" />
                          )}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
