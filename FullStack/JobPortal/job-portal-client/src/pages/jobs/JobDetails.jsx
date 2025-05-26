import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FiMapPin, 
  FiClock, 
  FiDollarSign,
  FiUsers,
  FiBookmark,
  FiShare2,
  FiArrowLeft,
  FiExternalLink,
  FiCalendar,
  FiAward,
  FiBriefcase
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { jobAPI } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await jobAPI.getJobById(id);
      setJob(response);
    } catch (error) {
      console.error('Error fetching job details:', error);
      // Mock data for development
      setJob({
        _id: id,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        type: 'Full-time',
        salary: '$120,000 - $150,000',
        description: `We are looking for a Senior Frontend Developer to join our dynamic team and help build the next generation of web applications. You will work with cutting-edge technologies and collaborate with talented engineers, designers, and product managers.

As a Senior Frontend Developer, you will be responsible for developing and maintaining user-facing features, ensuring the technical feasibility of UI/UX designs, and optimizing applications for maximum speed and scalability.

This is an excellent opportunity for someone who is passionate about creating exceptional user experiences and wants to make a significant impact in a fast-growing company.`,
        requirements: [
          '5+ years of experience in frontend development',
          'Expert knowledge of React.js and its ecosystem',
          'Strong proficiency in JavaScript, HTML5, and CSS3',
          'Experience with TypeScript',
          'Familiarity with modern build tools (Webpack, Vite)',
          'Knowledge of responsive design and cross-browser compatibility',
          'Experience with version control systems (Git)',
          'Understanding of RESTful APIs and GraphQL',
          'Knowledge of testing frameworks (Jest, Cypress)',
          'Experience with state management libraries (Redux, Zustand)'
        ],
        responsibilities: [
          'Develop new user-facing features using React.js',
          'Build reusable components and front-end libraries',
          'Translate designs and wireframes into high-quality code',
          'Optimize components for maximum performance across devices',
          'Collaborate with backend developers and designers',
          'Ensure the technical feasibility of UI/UX designs',
          'Participate in code reviews and maintain code quality',
          'Stay up-to-date with emerging technologies and industry trends',
          'Mentor junior developers and contribute to team growth'
        ],
        benefits: [
          'Competitive salary and equity package',
          'Comprehensive health, dental, and vision insurance',
          'Flexible work arrangements and remote options',
          'Professional development budget ($3,000/year)',
          'Unlimited PTO policy',
          'State-of-the-art equipment and tools',
          'Catered meals and snacks',
          'Gym membership reimbursement',
          'Retirement savings plan with company match',
          'Annual team retreats and company events'
        ],
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        featured: true,
        companyLogo: 'https://via.placeholder.com/64x64',
        applicants: 45,
        companyInfo: {
          name: 'TechCorp Inc.',
          website: 'https://techcorp.example.com',
          employees: '500-1000',
          industry: 'Technology',
          founded: '2015',
          description: 'TechCorp is a leading technology company focused on building innovative software solutions that help businesses grow and succeed in the digital age.'
        },
        experienceLevel: 'Senior Level',
        workLocation: 'Hybrid',
        employmentType: 'Full-time'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (!user) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    navigate(`/apply/${id}`);
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // TODO: Implement bookmark API call
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: job.title,
          text: `Check out this job opportunity: ${job.title} at ${job.company}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getDaysUntilDeadline = (deadline) => {
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return days;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-6">The job you're looking for doesn't exist or has been removed.</p>
          <Link to="/jobs" className="btn-primary">
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  const daysUntilDeadline = getDaysUntilDeadline(job.deadline);

  return (
    <>
      <Helmet>
        <title>{job.title} - {job.company} | Career Code</title>
        <meta name="description" content={job.description.substring(0, 160)} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between mb-6">
              <Link
                to="/jobs"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <FiArrowLeft size={20} className="mr-2" />
                Back to Jobs
              </Link>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-lg border transition-colors duration-200 ${
                    bookmarked 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-white border-gray-300 text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <FiBookmark size={20} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-lg border border-gray-300 bg-white text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FiShare2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-start space-x-4 mb-6 lg:mb-0">
                <img
                  src={job.companyLogo}
                  alt={`${job.company} logo`}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&size=64&background=6366f1&color=ffffff`;
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                    {job.featured && (
                      <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-gray-600 mb-4">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-gray-500">
                    <div className="flex items-center">
                      <FiMapPin size={18} className="mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <FiBriefcase size={18} className="mr-2" />
                      <span>{job.workLocation}</span>
                    </div>
                    <div className="flex items-center">
                      <FiDollarSign size={18} className="mr-2" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <FiUsers size={18} className="mr-2" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center">
                      <FiClock size={18} className="mr-2" />
                      <span>Posted {formatDate(job.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:ml-8 flex-shrink-0">
                <div className="bg-gray-50 rounded-lg p-6 lg:w-80">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`job-type-badge ${getJobTypeClass(job.type)}`}>
                      {job.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {daysUntilDeadline > 0 ? `${daysUntilDeadline} days left` : 'Expired'}
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience Level:</span>
                      <span className="font-medium">{job.experienceLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Employment Type:</span>
                      <span className="font-medium">{job.employmentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Application Deadline:</span>
                      <span className="font-medium">{formatDate(job.deadline)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleApply}
                    disabled={daysUntilDeadline <= 0}
                    className="btn-primary w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {daysUntilDeadline <= 0 ? 'Application Closed' : 'Apply Now'}
                  </button>
                  
                  {!user && (
                    <p className="text-sm text-gray-500 text-center mt-3">
                      <Link to="/login" className="text-primary-600 hover:text-primary-700">
                        Sign in
                      </Link>{' '}
                      to apply for this job
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="prose prose-gray max-w-none">
                  {job.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About {job.company}</h3>
                <div className="space-y-4">
                  <p className="text-gray-700">{job.companyInfo.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Industry:</span>
                      <span className="font-medium">{job.companyInfo.industry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company Size:</span>
                      <span className="font-medium">{job.companyInfo.employees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-medium">{job.companyInfo.founded}</span>
                    </div>
                  </div>
                  
                  {job.companyInfo.website && (
                    <a
                      href={job.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
                    >
                      Visit Website
                      <FiExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* Similar Jobs */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Jobs</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-primary-300 transition-colors duration-200">
                      <Link to={`/jobs/${index + 2}`} className="block">
                        <h4 className="font-medium text-gray-900 mb-1">Frontend Developer</h4>
                        <p className="text-sm text-gray-600 mb-2">Tech Company Inc.</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>Remote</span>
                          <span>$80k - $120k</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                <Link
                  to="/jobs"
                  className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium mt-4"
                >
                  View All Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetails;
