import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Helmet from '../components/ui/Helmet';
import { 
  FiSearch, 
  FiBriefcase, 
  FiUsers, 
  FiTrendingUp, 
  FiAward, 
  FiClock, 
  FiMapPin,
  FiArrowRight 
} from 'react-icons/fi';

const Home = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Smart Job Search",
      description: "Advanced filters and AI-powered recommendations to find your perfect job match."
    },
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Easy Application",
      description: "Apply to multiple jobs with one click using your saved profile and resume."
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Connect with Employers",
      description: "Direct communication with hiring managers and real-time application updates."
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Track your applications and get insights to improve your job search strategy."
    }
  ];

  const stats = [
    { label: "Active Jobs", value: "10,000+", icon: <FiBriefcase /> },
    { label: "Companies", value: "2,500+", icon: <FiUsers /> },
    { label: "Success Stories", value: "50,000+", icon: <FiAward /> },
    { label: "Daily Applications", value: "1,000+", icon: <FiClock /> }
  ];

  const jobCategories = [
    { name: "Technology", count: "3,245 jobs", color: "bg-blue-100 text-blue-800" },
    { name: "Marketing", count: "1,832 jobs", color: "bg-green-100 text-green-800" },
    { name: "Design", count: "1,456 jobs", color: "bg-purple-100 text-purple-800" },
    { name: "Sales", count: "2,198 jobs", color: "bg-orange-100 text-orange-800" },
    { name: "Finance", count: "987 jobs", color: "bg-red-100 text-red-800" },
    { name: "Healthcare", count: "1,567 jobs", color: "bg-pink-100 text-pink-800" }
  ];

  return (
    <>
      <Helmet 
        title="Find Your Dream Job"
        description="Discover thousands of job opportunities on Career Code. Connect with top employers and advance your career today."
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Find Your <span className="text-yellow-400">Dream Job</span> Today
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                Connect with top employers and discover opportunities that match your skills and ambitions.
              </p>
              
              {/* Search Bar */}
              <div className="bg-white rounded-lg shadow-xl p-4 mb-8 max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Job title, keywords, or company"
                      className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-full pl-10 pr-4 py-3 text-gray-900 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <Link
                    to="/jobs"
                    className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <span>Search Jobs</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user ? (
                  <>
                    <Link
                      to="/jobs"
                      className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Browse Jobs
                    </Link>
                    <Link
                      to="/add-job"
                      className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Post a Job
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/jobs"
                      className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      Browse Jobs
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-600 rounded-lg mb-4">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Job Categories */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Job Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore opportunities across various industries and find the perfect match for your skills.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobCategories.map((category, index) => (
                <Link
                  key={index}
                  to={`/jobs?category=${category.name.toLowerCase()}`}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {category.name}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${category.color}`}>
                        {category.count}
                      </span>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Career Code?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We provide the tools and opportunities you need to advance your career and find meaningful work.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-lg mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have found their dream jobs through Career Code.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
