import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../components/ui/Helmet';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { jobsAPI } from '../services/api';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiSearch, FiFilter } from 'react-icons/fi';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    location: '',
    employmentType: '',
    salaryMin: '',
    salaryMax: ''
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchJobs();
  }, [filters, pagination.currentPage]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: 12,
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''))
      };
      
      const response = await jobsAPI.getJobs(params);
      setJobs(response.data.jobs);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const formatSalary = (job) => {
    if (!job.salary.min && !job.salary.max) return 'Salary not specified';
    
    const format = (amount) => {
      if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
      if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
      return amount.toString();
    };

    const period = job.salary.period === 'yearly' ? '/year' : `/${job.salary.period}`;
    
    if (job.salary.min && job.salary.max) {
      return `$${format(job.salary.min)} - $${format(job.salary.max)}${period}`;
    } else if (job.salary.min) {
      return `$${format(job.salary.min)}+ ${period}`;
    } else {
      return `Up to $${format(job.salary.max)}${period}`;
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

  return (
    <>
      <Helmet 
        title="Browse Jobs"
        description="Find your dream job from thousands of job listings. Search by location, category, and salary range."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Dream Job</h1>
              <p className="text-lg text-gray-600 mb-8">
                Discover {pagination.total} job opportunities from top companies
              </p>
              
              {/* Search Bar */}
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search jobs, companies, or keywords..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                      className="w-full md:w-64 pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                <div className="flex items-center mb-6">
                  <FiFilter className="w-5 h-5 mr-2 text-gray-600" />
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                </div>

                <div className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      <option value="Technology">Technology</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Design">Design</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>

                  {/* Employment Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                    <select
                      value={filters.employmentType}
                      onChange={(e) => handleFilterChange('employmentType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="Min salary"
                        value={filters.salaryMin}
                        onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Max salary"
                        value={filters.salaryMax}
                        onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => {
                      setFilters({
                        search: '',
                        category: '',
                        location: '',
                        employmentType: '',
                        salaryMin: '',
                        salaryMax: ''
                      });
                    }}
                    className="w-full px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Jobs List */}
            <div className="lg:w-3/4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <LoadingSpinner />
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <FiBriefcase className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </div>
              ) : (
                <>
                  {/* Results Info */}
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                      Showing {jobs.length} of {pagination.total} jobs
                    </p>
                    <Link
                      to="/add-job"
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Post a Job
                    </Link>
                  </div>

                  {/* Jobs Grid */}
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div key={job._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <Link 
                              to={`/jobs/${job._id}`}
                              className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                            >
                              {job.title}
                            </Link>
                            <p className="text-lg text-blue-600 font-medium mt-1">{job.company.name}</p>
                          </div>
                          <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            {job.employment.type}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4 gap-4">
                          <div className="flex items-center">
                            <FiMapPin className="w-4 h-4 mr-1" />
                            {job.location.type === 'remote' ? 'Remote' : 
                             `${job.location.city || ''} ${job.location.state || ''}`.trim() || 'Location not specified'}
                          </div>
                          <div className="flex items-center">
                            <FiDollarSign className="w-4 h-4 mr-1" />
                            {formatSalary(job)}
                          </div>
                          <div className="flex items-center">
                            <FiClock className="w-4 h-4 mr-1" />
                            {getTimeAgo(job.createdAt)}
                          </div>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">
                          {job.description.substring(0, 200)}...
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex flex-wrap gap-2">
                            {job.category && (
                              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                {job.category}
                              </span>
                            )}
                          </div>
                          <Link
                            to={`/jobs/${job._id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }))}
                          disabled={pagination.currentPage === 1}
                          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        
                        {[...Array(pagination.totalPages)].map((_, i) => (
                          <button
                            key={i + 1}
                            onClick={() => setPagination(prev => ({ ...prev, currentPage: i + 1 }))}
                            className={`px-4 py-2 text-sm border rounded-md ${
                              pagination.currentPage === i + 1
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }))}
                          disabled={pagination.currentPage === pagination.totalPages}
                          className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
