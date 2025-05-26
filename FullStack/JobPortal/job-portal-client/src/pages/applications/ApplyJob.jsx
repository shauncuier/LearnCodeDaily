import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  FiUpload, 
  FiFile, 
  FiX, 
  FiCheck,
  FiArrowLeft,
  FiMapPin,
  FiDollarSign,
  FiBriefcase
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { jobAPI, applicationAPI, uploadAPI } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadingCoverLetter, setUploadingCoverLetter] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    portfolio: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    expectedSalary: '',
    availabilityDate: '',
    workAuthorization: '',
    relocation: '',
    experience: '',
    motivation: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login', { state: { from: `/apply/${id}` } });
      return;
    }
    fetchJobDetails();
    prefillUserData();
  }, [id, user, navigate]);

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
        companyLogo: 'https://via.placeholder.com/64x64',
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
    } finally {
      setLoading(false);
    }
  };

  const prefillUserData = () => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email || ''
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileUpload = async (file, type) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (file.size > maxSize) {
      toast.error('File size must be less than 5MB');
      return;
    }
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF and Word documents are allowed');
      return;
    }

    try {
      if (type === 'resume') {
        setUploadingResume(true);
      } else {
        setUploadingCoverLetter(true);
      }

      const response = await uploadAPI.uploadFile(file, type);
      
      if (type === 'resume') {
        setResumeFile({
          name: file.name,
          url: response.url,
          size: file.size
        });
      } else {
        setCoverLetterFile({
          name: file.name,
          url: response.url,
          size: file.size
        });
      }
      
      toast.success(`${type === 'resume' ? 'Resume' : 'Cover letter'} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload file. Please try again.');
    } finally {
      if (type === 'resume') {
        setUploadingResume(false);
      } else {
        setUploadingCoverLetter(false);
      }
    }
  };

  const removeFile = (type) => {
    if (type === 'resume') {
      setResumeFile(null);
    } else {
      setCoverLetterFile(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!resumeFile) {
      newErrors.resume = 'Resume is required';
    }
    
    if (!formData.coverLetter.trim()) {
      newErrors.coverLetter = 'Cover letter is required';
    }
    
    if (!formData.workAuthorization) {
      newErrors.workAuthorization = 'Work authorization status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setSubmitting(true);
    
    try {
      const applicationData = {
        ...formData,
        resumeUrl: resumeFile?.url,
        coverLetterFileUrl: coverLetterFile?.url,
        appliedAt: new Date().toISOString()
      };
      
      await applicationAPI.applyForJob(id, applicationData);
      
      toast.success('Application submitted successfully!');
      navigate('/applications', { 
        state: { 
          message: 'Your application has been submitted successfully!' 
        }
      });
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <p className="text-gray-600 mb-6">The job you're trying to apply for doesn't exist.</p>
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Apply for {job.title} - Career Code</title>
        <meta name="description" content={`Apply for ${job.title} position at ${job.company}`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container-custom py-6">
            <Link
              to={`/jobs/${id}`}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-6"
            >
              <FiArrowLeft size={20} className="mr-2" />
              Back to Job Details
            </Link>
            
            <div className="flex items-center space-x-4">
              <img
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&size=64&background=6366f1&color=ffffff`;
                }}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                  Apply for {job.title}
                </h1>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiMapPin size={16} className="mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <FiBriefcase size={16} className="mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign size={16} className="mr-1" />
                    {job.salary}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input ${errors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2">
                      Portfolio Website
                    </label>
                    <input
                      type="url"
                      id="portfolio"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://yourportfolio.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Documents</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Resume Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume *
                    </label>
                    {!resumeFile ? (
                      <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                        errors.resume ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                      }`}>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e.target.files[0], 'resume')}
                          className="hidden"
                          id="resume-upload"
                          disabled={uploadingResume}
                        />
                        <label
                          htmlFor="resume-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          {uploadingResume ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <FiUpload size={24} className="text-gray-400 mb-2" />
                          )}
                          <span className="text-sm text-gray-600">
                            {uploadingResume ? 'Uploading...' : 'Click to upload resume'}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            PDF, DOC, DOCX (max 5MB)
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FiFile size={20} className="text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{resumeFile.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(resumeFile.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('resume')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    )}
                    {errors.resume && (
                      <p className="mt-1 text-sm text-red-600">{errors.resume}</p>
                    )}
                  </div>

                  {/* Cover Letter Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cover Letter (Optional)
                    </label>
                    {!coverLetterFile ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleFileUpload(e.target.files[0], 'coverLetter')}
                          className="hidden"
                          id="cover-letter-upload"
                          disabled={uploadingCoverLetter}
                        />
                        <label
                          htmlFor="cover-letter-upload"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          {uploadingCoverLetter ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            <FiUpload size={24} className="text-gray-400 mb-2" />
                          )}
                          <span className="text-sm text-gray-600">
                            {uploadingCoverLetter ? 'Uploading...' : 'Click to upload cover letter'}
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            PDF, DOC, DOCX (max 5MB)
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <FiFile size={20} className="text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{coverLetterFile.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(coverLetterFile.size)}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('coverLetter')}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FiX size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Letter Text */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Cover Letter *</h2>
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us why you're interested in this position
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    rows={6}
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.coverLetter ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Write a compelling cover letter explaining why you're the perfect fit for this role..."
                  />
                  {errors.coverLetter && (
                    <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.coverLetter.length}/1000 characters
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700 mb-2">
                        Expected Salary
                      </label>
                      <input
                        type="text"
                        id="expectedSalary"
                        name="expectedSalary"
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="$120,000 - $150,000"
                      />
                    </div>

                    <div>
                      <label htmlFor="availabilityDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Availability Date
                      </label>
                      <input
                        type="date"
                        id="availabilityDate"
                        name="availabilityDate"
                        value={formData.availabilityDate}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Work Authorization Status *
                    </label>
                    <div className="space-y-2">
                      {[
                        'US Citizen',
                        'Permanent Resident',
                        'Work Visa (H1B, L1, etc.)',
                        'Student Visa (F1, OPT)',
                        'Require Sponsorship'
                      ].map((option) => (
                        <label key={option} className="flex items-center">
                          <input
                            type="radio"
                            name="workAuthorization"
                            value={option}
                            checked={formData.workAuthorization === option}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                    {errors.workAuthorization && (
                      <p className="mt-1 text-sm text-red-600">{errors.workAuthorization}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Are you willing to relocate?
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="relocation"
                          value="yes"
                          checked={formData.relocation === 'yes'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="relocation"
                          value="no"
                          checked={formData.relocation === 'no'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link
                  to={`/jobs/${id}`}
                  className="btn-secondary"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex items-center"
                >
                  {submitting ? (
                    <>
                      <LoadingSpinner size="sm" color="#ffffff" className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FiCheck size={18} className="mr-2" />
                      Submit Application
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyJob;
