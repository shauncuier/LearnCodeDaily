import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FiSearch, 
  FiFilter,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiEye,
  FiDownload,
  FiExternalLink,
  FiCalendar,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { applicationAPI } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Under Review' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview', label: 'Interview Scheduled' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  useEffect(() => {
    if (user) {
      fetchApplications();
    }
  }, [user, searchQuery, statusFilter, sortBy]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await applicationAPI.getUserApplications();
      setApplications(response.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      // Mock data for development
      setApplications([
        {
          _id: '1',
          job: {
            _id: 'job1',
            title: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            location: 'San Francisco, CA',
            type: 'Full-time',
            salary: '$120,000 - $150,000',
            companyLogo: 'https://via.placeholder.com/64x64'
          },
          status: 'pending',
          appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          coverLetter: 'I am excited to apply for this position...',
          resumeUrl: 'https://example.com/resume.pdf',
          expectedSalary: '$130,000',
          notes: ''
        },
        {
          _id: '2',
          job: {
            _id: 'job2',
            title: 'Product Manager',
            company: 'Innovation Labs',
            location: 'New York, NY',
            type: 'Full-time',
            salary: '$110,000 - $140,000',
            companyLogo: 'https://via.placeholder.com/64x64'
          },
          status: 'interview',
          appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          coverLetter: 'With my experience in product management...',
          resumeUrl: 'https://example.com/resume.pdf',
          expectedSalary: '$125,000',
          notes: 'Interview scheduled for next Monday'
        },
        {
          _id: '3',
          job: {
            _id: 'job3',
            title: 'UX/UI Designer',
            company: 'Design Studio Pro',
            location: 'Remote',
            type: 'Full-time',
            salary: '$80,000 - $100,000',
            companyLogo: 'https://via.placeholder.com/64x64'
          },
          status: 'shortlisted',
          appliedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          coverLetter: 'As a passionate UX/UI designer...',
          resumeUrl: 'https://example.com/resume.pdf',
          expectedSalary: '$90,000',
          notes: ''
        },
        {
          _id: '4',
          job: {
            _id: 'job4',
            title: 'Backend Developer',
            company: 'Cloud Solutions Inc.',
            location: 'Austin, TX',
            type: 'Full-time',
            salary: '$100,000 - $130,000',
            companyLogo: 'https://via.placeholder.com/64x64'
          },
          status: 'rejected',
          appliedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
          lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          coverLetter: 'I am interested in the backend developer position...',
          resumeUrl: 'https://example.com/resume.pdf',
          expectedSalary: '$115,000',
          notes: 'Thank you for your interest. We decided to move forward with other candidates.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchQuery || 
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.appliedAt) - new Date(a.appliedAt);
      case 'oldest':
        return new Date(a.appliedAt) - new Date(b.appliedAt);
      case 'company':
        return a.job.company.localeCompare(b.job.company);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const getStatusClass = (status) => {
    const statusMap = {
      pending: 'status-pending',
      reviewed: 'status-pending',
      shortlisted: 'status-shortlisted',
      interview: 'bg-blue-100 text-blue-800',
      hired: 'status-approved',
      rejected: 'status-rejected'
    };
    return statusMap[status] || 'status-pending';
  };

  const getStatusText = (status) => {
    const statusMap = {
      pending: 'Pending',
      reviewed: 'Under Review',
      shortlisted: 'Shortlisted',
      interview: 'Interview',
      hired: 'Hired',
      rejected: 'Rejected'
    };
    return statusMap[status] || status;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getRelativeTime = (date) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diffInDays = Math.floor((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (Math.abs(diffInDays) < 1) {
      return 'Today';
    } else if (Math.abs(diffInDays) < 7) {
      return rtf.format(diffInDays, 'day');
    } else {
      return formatDate(date);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view your applications.</p>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Applications - Career Code</title>
        <meta name="description" content="Track and manage your job applications" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container-custom py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
                <p className="text-gray-600">
                  Track the progress of your job applications
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Link to="/jobs" className="btn-primary">
                  Browse More Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by job title or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input pl-10"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="form-select"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="company">Company A-Z</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{applications.length}</p>
                </div>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiEye className="w-4 h-4 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => ['pending', 'reviewed'].includes(app.status)).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FiClock className="w-4 h-4 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.filter(app => ['shortlisted', 'interview'].includes(app.status)).length}
                  </p>
                </div>
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiCalendar className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {applications.length > 0 
                      ? Math.round((applications.filter(app => app.status === 'hired').length / applications.length) * 100)
                      : 0}%
                  </p>
                </div>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="w-4 h-4 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Applications List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : sortedApplications.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FiSearch size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {applications.length === 0 ? 'No Applications Yet' : 'No Applications Found'}
              </h3>
              <p className="text-gray-600 mb-6">
                {applications.length === 0 
                  ? "You haven't applied to any jobs yet. Start browsing and apply to your dream job!"
                  : "Try adjusting your search criteria or filters to find your applications."
                }
              </p>
              <Link to="/jobs" className="btn-primary">
                Browse Jobs
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedApplications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Company Logo */}
                      <img
                        src={application.job.companyLogo}
                        alt={`${application.job.company} logo`}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(application.job.company)}&size=48&background=6366f1&color=ffffff`;
                        }}
                      />

                      {/* Application Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <Link
                            to={`/jobs/${application.job._id}`}
                            className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200"
                          >
                            {application.job.title}
                          </Link>
                          <span className={`status-badge ${getStatusClass(application.status)}`}>
                            {getStatusText(application.status)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{application.job.company}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <FiMapPin size={16} className="mr-1" />
                            {application.job.location}
                          </div>
                          <div className="flex items-center">
                            <FiDollarSign size={16} className="mr-1" />
                            {application.job.salary}
                          </div>
                          <div className="flex items-center">
                            <FiClock size={16} className="mr-1" />
                            Applied {getRelativeTime(application.appliedAt)}
                          </div>
                          {application.lastUpdated !== application.appliedAt && (
                            <div className="flex items-center">
                              <span>Updated {getRelativeTime(application.lastUpdated)}</span>
                            </div>
                          )}
                        </div>

                        {application.notes && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-700">
                              <strong>Note:</strong> {application.notes}
                            </p>
                          </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                            {application.job.type}
                          </span>
                          {application.expectedSalary && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                              Expected: {application.expectedSalary}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 ml-4">
                      <Link
                        to={`/jobs/${application.job._id}`}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                        title="View Job Details"
                      >
                        <FiExternalLink size={18} />
                      </Link>
                      
                      {application.resumeUrl && (
                        <a
                          href={application.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-green-600 transition-colors duration-200"
                          title="Download Resume"
                        >
                          <FiDownload size={18} />
                        </a>
                      )}
                      
                      <button
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        title="View Application Details"
                      >
                        <FiEye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination could be added here if needed */}
        </div>
      </div>
    </>
  );
};

export default MyApplications;
