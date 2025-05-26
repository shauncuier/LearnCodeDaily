import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jobAPI } from '../services/api';
import { 
  FiSearch, 
  FiMapPin, 
  FiBriefcase, 
  FiTrendingUp,
  FiUsers,
  FiAward,
  FiClock,
  FiDollarSign,
  FiArrowRight,
  FiStar
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    companies: 0,
    candidates: 0,
    placements: 0
  });
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await jobAPI.getJobs({ limit: 6, featured: true });
        setFeaturedJobs(response.jobs || []);
        setStats({
          totalJobs: response.totalJobs || 1250,
          companies: response.companies || 350,
          candidates: response.candidates || 15000,
          placements: response.placements || 8500
        });
      } catch (error) {
        console.error('Error fetching featured jobs:', error);
        // Set fallback data for demo
        setFeaturedJobs([
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
            createdAt: new Date()
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
            createdAt: new Date()
          }
        ]);
        setStats({
          totalJobs: 1250,
          companies: 350,
          candidates: 15000,
          placements: 8500
        });
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (location) params.append('location', location);
    navigate(`/jobs?${params.toString()}`);
  };

  const getJobTypeColor = (type) => {
    const colors = {
      'Full-time': 'job-type-fulltime',
      'Part-time': 'job-type-parttime',
      'Contract': 'job-type-contract',
      'Internship': 'job-type-internship',
      'Remote': 'job-type-remote'
    };
    return colors[type] || 'job-type-fulltime';
  };

  const timeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <>
      <Helmet>
        <title>Career Code - Find Your Dream Job</title>
        <meta name="description" content="Discover thousands of job opportunities from top companies. Join Career Code and take the next step in your career journey." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative container-custom py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading"
            >
              Find Your <span className="text-yellow-300">Dream Job</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto"
            >
              Connect with top employers and discover thousands of opportunities 
              that match your skills and career aspirations.
            </motion.p>

            {/* Search Form */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onSubmit={handleSearch}
              className="bg-white rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Job title, keywords, or company"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-lg"
                  />
                </div>
                <div className="flex-1 relative">
                  <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 text-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2 md:w-auto w-full"
                >
                  <FiSearch size={20} />
                  <span>Search Jobs</span>
                </button>
              </div>
            </motion.form>

            {/* Quick Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-3xl mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{stats.totalJobs.toLocaleString()}+</div>
                <div className="text-blue-100">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{stats.companies.toLocaleString()}+</div>
                <div className="text-blue-100">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{stats.candidates.toLocaleString()}+</div>
                <div className="text-blue-100">Candidates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-300">{stats.placements.toLocaleString()}+</div>
                <div className="text-blue-100">Placements</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Opportunities</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover hand-picked job opportunities from top companies looking for talented professionals like you.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
                      <p className="text-gray-600 font-medium mb-1">{job.company}</p>
                      <p className="text-gray-500 text-sm flex items-center">
                        <FiMapPin size={14} className="mr-1" />
                        {job.location}
                      </p>
                    </div>
                    <span className={`job-type-badge ${getJobTypeColor(job.type)}`}>
                      {job.type}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.requirements?.slice(0, 3).map((skill, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500 flex items-center">
                      <FiClock size={14} className="mr-1" />
                      {timeAgo(job.createdAt)}
                    </div>
                    {job.salary && (
                      <div className="text-primary-600 font-semibold text-sm">
                        {job.salary}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      to={user ? `/jobs/details/${job._id}` : '/login'}
                      className="w-full btn-primary text-center inline-flex items-center justify-center"
                    >
                      <span>View Details</span>
                      <FiArrowRight size={16} className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              to="/jobs"
              className="btn-outline inline-flex items-center"
            >
              <span>View All Jobs</span>
              <FiArrowRight size={18} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Career Code?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to connecting talented professionals with amazing opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FiBriefcase,
                title: 'Quality Jobs',
                description: 'Curated opportunities from verified companies and startups.'
              },
              {
                icon: FiUsers,
                title: 'Expert Network',
                description: 'Connect with industry professionals and expand your network.'
              },
              {
                icon: FiTrendingUp,
                title: 'Career Growth',
                description: 'Tools and resources to accelerate your career progression.'
              },
              {
                icon: FiAward,
                title: 'Top Companies',
                description: 'Access to exclusive opportunities from leading organizations.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream jobs through Career Code.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Get Started Today
                </Link>
                <Link
                  to="/jobs"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Browse Jobs
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/jobs"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/add-jobs"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                >
                  Post a Job
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
