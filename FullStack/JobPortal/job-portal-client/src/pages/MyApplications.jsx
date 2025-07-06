import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../components/ui/Helmet';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { applicationsAPI } from '../services/api';
import { 
  FiEye, 
  FiTrash2, 
  FiMapPin, 
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiCalendar,
  FiFileText
} from 'react-icons/fi';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    if (user && user.role === 'job_seeker') {
      fetchMyApplications();
    }
  }, [user]);

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationsAPI.getMyApplications();
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (applicationId) => {
    if (!window.confirm('Are you sure you want to withdraw this application? This action cannot be undone.')) {
      return;
    }

    setDeleting(applicationId);
    try {
      await applicationsAPI.deleteApplication(applicationId);
      setApplications(applications.filter(app => app._id !== applicationId));
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to withdraw application. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Not specified';
    
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'shortlisted':
        return 'bg-purple-100 text-purple-800';
      case 'interview':
        return 'bg-indigo-100 text-indigo-800';
      case 'offered':
        return 'bg-green-100 text-green-800';
      case 'hired':
        return 'bg-green-200 text-green-900';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending Review',
      reviewed: 'Under Review',
      shortlisted: 'Shortlisted',
      interview: 'Interview Scheduled',
      offered: 'Job Offered',
      hired: 'Hired',
      rejected: 'Not Selected'
    };
    return statusMap[status] || status;
  };

  if (!user || user.role !== 'job_seeker') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">Only job seekers can access this page.</p>
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
        title="My Applications"
        description="Track your job applications and view their status."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
                <p className="text-lg text-gray-600">
                  Track the status of your job applications
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  to="/jobs"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiBriefcase className="w-5 h-5 mr-2" />
                  Browse Jobs
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
          ) : applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <FiFileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600 mb-6">Start applying for jobs that interest you.</p>
              <Link
                to="/jobs"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiBriefcase className="w-5 h-5 mr-2" />
                Browse Available Jobs
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <FiFileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <FiClock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {applications.filter(app => app.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <FiEye className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Under Review</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {applications.filter(app => ['reviewed', 'shortlisted', 'interview'].includes(app.status)).length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 rounded-full">
                      <FiBriefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Positive</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {applications.filter(app => ['offered', 'hired'].includes(app.status)).length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application._id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                              <Link 
                                to={`/jobs/${application.job._id}`}
                                className="hover:text-blue-600 transition-colors"
                              >
                                {application.job.title}
                              </Link>
                            </h3>
                            <div className="flex items-center text-blue-600 mb-2">
                              <FiBriefcase className="w-4 h-4 mr-1" />
                              <span className="font-medium">{application.job.company.name}</span>
                            </div>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
                            {getStatusText(application.status)}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4">
                          <div className="flex items-center">
                            <FiMapPin className="w-4 h-4 mr-1" />
                            {application.job.location.type === 'remote' ? 'Remote' : 
                             `${application.job.location.city || ''} ${application.job.location.state || ''}`.trim() || 'Location not specified'}
                          </div>
                          <div className="flex items-center">
                            <FiBriefcase className="w-4 h-4 mr-1" />
                            {application.job.employment.type}
                          </div>
                          <div className="flex items-center">
                            <FiDollarSign className="w-4 h-4 mr-1" />
                            {formatSalary(application.job.salary)}
                          </div>
                          <div className="flex items-center">
                            <FiCalendar className="w-4 h-4 mr-1" />
                            Applied {getTimeAgo(application.appliedAt)}
                          </div>
                        </div>

                        {application.coverLetter && (
                          <div className="mb-4">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Cover Letter:</h4>
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {application.coverLetter}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-2 mt-4 lg:mt-0 lg:ml-6">
                        <Link
                          to={`/jobs/${application.job._id}`}
                          className="inline-flex items-center justify-center px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <FiEye className="w-4 h-4 mr-1" />
                          View Job
                        </Link>
                        
                        {['pending', 'reviewed'].includes(application.status) && (
                          <button
                            onClick={() => handleDeleteApplication(application._id)}
                            disabled={deleting === application._id}
                            className="inline-flex items-center justify-center px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {deleting === application._id ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-1"></div>
                            ) : (
                              <FiTrash2 className="w-4 h-4 mr-1" />
                            )}
                            Withdraw
                          </button>
                        )}
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

export default MyApplications;
