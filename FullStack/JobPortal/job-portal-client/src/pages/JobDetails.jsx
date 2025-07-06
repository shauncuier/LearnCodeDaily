import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Helmet from '../components/ui/Helmet';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { jobsAPI, applicationsAPI } from '../services/api';
import { 
  FiMapPin, 
  FiBriefcase, 
  FiDollarSign, 
  FiClock, 
  FiCalendar,
  FiUsers,
  FiBookmark,
  FiShare2,
  FiArrowLeft,
  FiGlobe
} from 'react-icons/fi';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const response = await jobsAPI.getJob(id);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job:', error);
      if (error.response?.status === 404) {
        navigate('/404');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setApplying(true);
    try {
      await applicationsAPI.applyJob(id, {
        coverLetter: 'Applied through Career Code platform'
      });
      setHasApplied(true);
    } catch (error) {
      console.error('Error applying for job:', error);
    } finally {
      setApplying(false);
    }
  };

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Salary not specified';
    
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job at ${job.company.name}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert('Job URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
          <Link to="/jobs" className="text-blue-600 hover:text-blue-500">
            Browse other jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet 
        title={`${job.title} at ${job.company.name}`}
        description={job.description.substring(0, 160)}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <FiArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <FiShare2 className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <FiBookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center text-xl text-blue-600 font-medium mb-4">
                  <FiBriefcase className="w-5 h-5 mr-2" />
                  {job.company.name}
                </div>
                
                <div className="flex flex-wrap items-center text-gray-600 gap-6 mb-6">
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
                    <FiClock className="w-4 h-4 mr-1" />
                    {getTimeAgo(job.createdAt)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
                    {job.employment.type}
                  </span>
                  {job.category && (
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                      {job.category}
                    </span>
                  )}
                  {job.location.type === 'remote' && (
                    <span className="px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                      Remote
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:ml-8">
                {user && user.role === 'job_seeker' && (
                  <button
                    onClick={handleApply}
                    disabled={applying || hasApplied}
                    className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium transition-colors ${
                      hasApplied
                        ? 'bg-green-600 text-white cursor-not-allowed'
                        : applying
                        ? 'bg-blue-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {hasApplied ? 'Applied' : applying ? 'Applying...' : 'Apply Now'}
                  </button>
                )}
                {!user && (
                  <Link
                    to="/login"
                    className="inline-block w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Sign in to Apply
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
                </div>
              </div>

              {/* Requirements */}
              {job.requirements && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{job.requirements}</p>
                  </div>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{job.responsibilities}</p>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted</span>
                    <span className="text-gray-900">{getTimeAgo(job.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employment Type</span>
                    <span className="text-gray-900">{job.employment.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience Level</span>
                    <span className="text-gray-900">
                      {job.qualifications?.experience?.min || 0}+ years
                    </span>
                  </div>
                  {job.applicationDeadline && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline</span>
                      <span className="text-gray-900">
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company.name}</h3>
                <div className="space-y-3">
                  {job.company.industry && (
                    <div className="flex items-center text-gray-600">
                      <FiBriefcase className="w-4 h-4 mr-2" />
                      {job.company.industry}
                    </div>
                  )}
                  {job.company.size && (
                    <div className="flex items-center text-gray-600">
                      <FiUsers className="w-4 h-4 mr-2" />
                      {job.company.size} employees
                    </div>
                  )}
                  {job.company.website && (
                    <div className="flex items-center text-gray-600">
                      <FiGlobe className="w-4 h-4 mr-2" />
                      <a 
                        href={job.company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-500"
                      >
                        Company Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              {job.contactInfo && (job.contactInfo.email || job.contactInfo.phone) && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-2">
                    {job.contactInfo.name && (
                      <p className="text-gray-900 font-medium">{job.contactInfo.name}</p>
                    )}
                    {job.contactInfo.email && (
                      <p className="text-gray-600">{job.contactInfo.email}</p>
                    )}
                    {job.contactInfo.phone && (
                      <p className="text-gray-600">{job.contactInfo.phone}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
