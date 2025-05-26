import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FiSearch, 
  FiMapPin, 
  FiFilter, 
  FiClock, 
  FiDollarSign,
  FiBookmark,
  FiEye,
  FiChevronDown,
  FiX
} from 'react-icons/fi';
import { jobAPI } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    jobType: '',
    experienceLevel: '',
    salaryRange: '',
    company: '',
    sortBy: 'newest'
  });
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];
  const salaryRanges = [
    'Under $50k',
    '$50k - $75k',
    '$75k - $100k',
    '$100k - $150k',
    'Above $150k'
  ];

  useEffect(() => {
    fetchJobs();
  }, [searchQuery, locationFilter, filters, currentPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {
        search: searchQuery,
        location: locationFilter,
        type: filters.jobType,
        experience: filters.experienceLevel,
        salary: filters.salaryRange,
        company: filters.company,
        sort: filters.sortBy,
        page: currentPage,
        limit: 12
      };
      
      const response = await jobAPI.getJobs(params);
      setJobs(response.jobs || []);
      setTotalJobs(response.total || 0);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Set mock data for development
      setJobs([
        {
          _id: '1',
          title: 'Senior Frontend Developer',
          company: 'TechCorp Inc.',
          location: 'San Francisco, CA',
          type: 'Full-time',
          salary: '$120,000 - $150,000',
          description: 'Join our team as a Senior Frontend Developer and work on cutting-edge web applications using React, TypeScript, and modern development tools.',
          requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          featured: true,
          companyLogo: 'https://via.placeholder.com/64x64',
          applicants: 45
        },
        {
          _id: '2',
          title: 'Product Manager',
          company: 'Innovation Labs',
          location: 'New York, NY',
          type: 'Full-time',
          salary: '$110,000 - $140,000',
          description: 'Lead product strategy and development for our flagship products. Work with cross-functional teams to deliver exceptional user experiences.',
          requirements: ['Product Management', 'Analytics', 'Leadership', '3+ years experience'],
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          featured: false,
          companyLogo: 'https://via.placeholder.com/64x64',
          applicants: 28
        },
        {
          _id: '3',
          title: 'UX/UI Designer',
          company: 'Design Studio Pro',
          location: 'Remote',
          type: 'Full-time',
          salary: '$80,000 - $100,000',
          description: 'Create amazing user experiences for web and mobile applications. Work with product teams to design intuitive interfaces.',
          requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '2+ years experience'],
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          featured: true,
          companyLogo: 'https://via.placeholder.com/64x64',
          applicants: 67
        },
        {
          _id: '4',
          title: 'Data Scientist',
          company: 'DataTech Solutions',
          location: 'Seattle, WA',
          type: 'Full-time',
          salary: '$130,000 - $160,000',
          description: 'Analyze complex datasets and build machine learning models to drive business insights and decision making.',
          requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics', '4+ years experience'],
          deadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
          createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          featured: false,
          companyLogo: 'https://via.placeholder.com/64x64',
          applicants: 32
        }
      ]);
      setTotalJobs(156);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs();
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      jobType: '',
      experienceLevel: '',
      salaryRange: '',
      company: '',
      sortBy: 'newest'
    });
    setSearchQuery('');
    setLocationFilter('');
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const getJobTypeClass = (type) => {
    const typeMap = {
      'Full-time': 'job-type-fulltime',
      'Part-time': 'job-type-parttime',
      'Contract': 'job-type-contract',
      'Internship': 'job-type-internship',
      'Remote': 'job-type-remote'
    };
    return typeMap[type] || 'job-type-fulltime';
  };

  return (
    <>
      <Helmet>
        <title>Find Jobs - Career Code</title>
        <meta name="description" content="Discover thousands of job opportunities from top companies. Find your dream job today." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Search Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container-custom py-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Find Your Dream Job
              </h1>
              
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search Input */}
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input pl-10"
                    />
                  </div>
                  
                  {/* Location Input */}
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="City, state, or remote"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="form-input pl-10"
                    />
                  </div>
                  
                  {/* Search Button */}
                  <button
                    type="submit"
                    className="btn-primary flex items-center justify-center"
                  >
                    <FiSearch size={18} className="mr-2" />
                    Search Jobs
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Job Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Job Type
                    </label>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <label key={type} className="flex items-center">
                          <input
                            type="radio"
                            name="jobType"
                            value={type}
                            checked={filters.jobType === type}
                            onChange={(e) => handleFilterChange('jobType', e.target.value)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Experience Level Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Experience Level
                    </label>
                    <div className="space-y-2">
                      {experienceLevels.map((level) => (
                        <label key={level} className="flex items-center">
                          <input
                            type="radio"
                            name="experienceLevel"
                            value={level}
                            checked={filters.experienceLevel === level}
                            onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Salary Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Salary Range
                    </label>
                    <div className="space-y-2">
                      {salaryRanges.map((range) => (
                        <label key={range} className="flex items-center">
                          <input
                            type="radio"
                            name="salaryRange"
                            value={range}
                            checked={filters.salaryRange === range}
                            onChange={(e) => handleFilterChange('salaryRange', e.target.value)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            <div className="lg:w-3/4">
              {/* Results Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {totalJobs.toLocaleString()} Jobs Found
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing page {currentPage} of {Math.ceil(totalJobs / 12)}
                  </p>
                </div>
                
                <div className="mt-4 sm:mt-0">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="form-select"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="salary-high">Salary: High to Low</option>
                    <option value="salary-low">Salary: Low to High</option>
                    <option value="deadline">Deadline Soon</option>
                  </select>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <>
                  {/* Job Cards */}
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job._id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            {/* Company Logo */}
                            <div className="flex-shrink-0">
                              <img
                                src={job.companyLogo}
                                alt={`${job.company} logo`}
                                className="w-12 h-12 rounded-lg object-cover"
                                onError={(e) => {
                                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&size=48&background=6366f1&color=ffffff`;
                                }}
                              />
                            </div>

                            {/* Job Details */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <Link
                                  to={`/jobs/${job._id}`}
                                  className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors duration-200"
                                >
                                  {job.title}
                                </Link>
                                {job.featured && (
                                  <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Featured
                                  </span>
                                )}
                              </div>
                              
                              <p className="text-gray-600 mb-2">{job.company}</p>
                              
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center">
                                  <FiMapPin size={16} className="mr-1" />
                                  {job.location}
                                </div>
                                <div className="flex items-center">
                                  <FiClock size={16} className="mr-1" />
                                  {formatDate(new Date(job.createdAt))}
                                </div>
                                <div className="flex items-center">
                                  <FiDollarSign size={16} className="mr-1" />
                                  {job.salary}
                                </div>
                                <div className="flex items-center">
                                  <FiEye size={16} className="mr-1" />
                                  {job.applicants} applicants
                                </div>
                              </div>
                              
                              <p className="text-gray-700 mb-4 line-clamp-2">
                                {job.description}
                              </p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`job-type-badge ${getJobTypeClass(job.type)}`}>
                                  {job.type}
                                </span>
                                {job.requirements.slice(0, 3).map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {job.requirements.length > 3 && (
                                  <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-500 rounded-full">
                                    +{job.requirements.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col gap-2 ml-4">
                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
                              <FiBookmark size={20} />
                            </button>
                            <Link
                              to={`/jobs/${job._id}`}
                              className="btn-primary text-sm px-4 py-2"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalJobs > 12 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: Math.min(5, Math.ceil(totalJobs / 12)) }, (_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              currentPage === i + 1
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalJobs / 12)))}
                          disabled={currentPage === Math.ceil(totalJobs / 12)}
                          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
