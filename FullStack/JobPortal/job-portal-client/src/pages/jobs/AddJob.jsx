import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from '../../components/ui/Helmet';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiDollarSign,
  FiSave,
  FiX,
  FiPlus,
  FiTrash2,
  FiEye,
  FiUpload
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const AddJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    workLocation: 'On-site',
    experienceLevel: 'Mid Level',
    salaryType: 'range',
    salaryMin: '',
    salaryMax: '',
    salaryFixed: '',
    currency: 'USD',
    description: '',
    responsibilities: [''],
    requirements: [''],
    skills: [],
    benefits: [''],
    applicationDeadline: '',
    startDate: '',
    department: '',
    numberOfPositions: 1,
    urgentHiring: false,
    featured: false,
    applicationInstructions: '',
    contactEmail: user?.email || '',
    contactPhone: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState({});
  const [newSkill, setNewSkill] = useState('');

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'];
  const workLocations = ['On-site', 'Remote', 'Hybrid'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive', 'Internship'];
  const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'BDT', 'INR'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleArrayChange = (arrayName, index, value) => {
    setJobData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (arrayName) => {
    setJobData(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }));
  };

  const removeArrayItem = (arrayName, index) => {
    setJobData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !jobData.skills.includes(newSkill.trim())) {
      setJobData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!jobData.title.trim()) newErrors.title = 'Job title is required';
    if (!jobData.company.trim()) newErrors.company = 'Company name is required';
    if (!jobData.location.trim()) newErrors.location = 'Location is required';
    if (!jobData.description.trim()) newErrors.description = 'Job description is required';
    if (!jobData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';

    if (jobData.salaryType === 'range') {
      if (!jobData.salaryMin) newErrors.salaryMin = 'Minimum salary is required';
      if (!jobData.salaryMax) newErrors.salaryMax = 'Maximum salary is required';
      if (jobData.salaryMin && jobData.salaryMax && parseFloat(jobData.salaryMin) >= parseFloat(jobData.salaryMax)) {
        newErrors.salaryMax = 'Maximum salary must be greater than minimum';
      }
    } else if (!jobData.salaryFixed) {
      newErrors.salaryFixed = 'Salary amount is required';
    }

    const validResponsibilities = jobData.responsibilities.filter(r => r.trim());
    if (validResponsibilities.length === 0) newErrors.responsibilities = 'At least one responsibility is required';

    const validRequirements = jobData.requirements.filter(r => r.trim());
    if (validRequirements.length === 0) newErrors.requirements = 'At least one requirement is required';

    if (jobData.skills.length === 0) newErrors.skills = 'At least one skill is required';

    const deadlineDate = new Date(jobData.applicationDeadline);
    const today = new Date();
    if (deadlineDate <= today) {
      newErrors.applicationDeadline = 'Application deadline must be in the future';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (publishStatus = 'draft') => {
    const cleanedData = {
      ...jobData,
      responsibilities: jobData.responsibilities.filter(r => r.trim()),
      requirements: jobData.requirements.filter(r => r.trim()),
      benefits: jobData.benefits.filter(b => b.trim()),
      status: publishStatus
    };

    if (publishStatus === 'published' && !validateForm()) {
      toast.error('Please fix the errors before publishing');
      return;
    }

    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (publishStatus === 'published') {
        toast.success('Job posted successfully!');
        navigate('/my-jobs');
      } else {
        toast.success('Job saved as draft');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const getSalaryDisplay = () => {
    if (jobData.salaryType === 'range') {
      return jobData.salaryMin && jobData.salaryMax 
        ? `${jobData.currency} ${jobData.salaryMin} - ${jobData.salaryMax}`
        : 'Salary not specified';
    } else {
      return jobData.salaryFixed 
        ? `${jobData.currency} ${jobData.salaryFixed}`
        : 'Salary not specified';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please sign in to post jobs.</p>
          <button
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (previewMode) {
    return (
      <>
        <Helmet>
          <title>Preview Job - {jobData.title || 'New Job'}</title>
        </Helmet>
        
        <div className="min-h-screen bg-gray-50">
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="container-custom py-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setPreviewMode(false)}
                  className="btn-secondary"
                >
                  ← Back to Edit
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Job Preview</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Preview Mode
                </span>
              </div>
            </div>
          </div>

          <div className="container-custom py-8">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {jobData.title || 'Job Title'}
                </h2>
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  <div className="flex items-center">
                    <FiBriefcase size={18} className="mr-2" />
                    {jobData.company || 'Company Name'}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin size={18} className="mr-2" />
                    {jobData.location || 'Location'}
                  </div>
                  <div className="flex items-center">
                    <FiDollarSign size={18} className="mr-2" />
                    {getSalaryDisplay()}
                  </div>
                </div>
              </div>

              {jobData.description && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Job Description</h3>
                  <div className="prose prose-gray max-w-none">
                    {jobData.description.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {jobData.responsibilities.filter(r => r.trim()).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Responsibilities</h3>
                  <ul className="space-y-2">
                    {jobData.responsibilities.filter(r => r.trim()).map((responsibility, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {jobData.requirements.filter(r => r.trim()).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                  <ul className="space-y-2">
                    {jobData.requirements.filter(r => r.trim()).map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {jobData.skills.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {jobData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Post a Job - Career Code</title>
        <meta name="description" content="Post a job and find the perfect candidates for your company" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container-custom py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
                <p className="text-gray-600">
                  Fill in the details below to create your job posting
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setPreviewMode(true)}
                  className="btn-secondary flex items-center"
                >
                  <FiEye size={18} className="mr-2" />
                  Preview
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto">
            <form className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={jobData.title}
                      onChange={handleInputChange}
                      className={`form-input ${errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="e.g. Senior Frontend Developer"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={jobData.company}
                      onChange={handleInputChange}
                      className={`form-input ${errors.company ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Your Company Name"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.company}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={jobData.location}
                      onChange={handleInputChange}
                      className={`form-input ${errors.location ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="e.g. San Francisco, CA"
                    />
                    {errors.location && (
                      <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type *
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={jobData.type}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="workLocation" className="block text-sm font-medium text-gray-700 mb-2">
                      Work Location *
                    </label>
                    <select
                      id="workLocation"
                      name="workLocation"
                      value={jobData.workLocation}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {workLocations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level *
                    </label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={jobData.experienceLevel}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Salary Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Salary Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Salary Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="salaryType"
                          value="range"
                          checked={jobData.salaryType === 'range'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Salary Range</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="salaryType"
                          value="fixed"
                          checked={jobData.salaryType === 'fixed'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Fixed Salary</span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                        Currency *
                      </label>
                      <select
                        id="currency"
                        name="currency"
                        value={jobData.currency}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        {currencies.map(currency => (
                          <option key={currency} value={currency}>{currency}</option>
                        ))}
                      </select>
                    </div>

                    {jobData.salaryType === 'range' ? (
                      <>
                        <div>
                          <label htmlFor="salaryMin" className="block text-sm font-medium text-gray-700 mb-2">
                            Minimum Salary *
                          </label>
                          <input
                            type="number"
                            id="salaryMin"
                            name="salaryMin"
                            value={jobData.salaryMin}
                            onChange={handleInputChange}
                            className={`form-input ${errors.salaryMin ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                            placeholder="50000"
                          />
                          {errors.salaryMin && (
                            <p className="mt-1 text-sm text-red-600">{errors.salaryMin}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="salaryMax" className="block text-sm font-medium text-gray-700 mb-2">
                            Maximum Salary *
                          </label>
                          <input
                            type="number"
                            id="salaryMax"
                            name="salaryMax"
                            value={jobData.salaryMax}
                            onChange={handleInputChange}
                            className={`form-input ${errors.salaryMax ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                            placeholder="80000"
                          />
                          {errors.salaryMax && (
                            <p className="mt-1 text-sm text-red-600">{errors.salaryMax}</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="md:col-span-2">
                        <label htmlFor="salaryFixed" className="block text-sm font-medium text-gray-700 mb-2">
                          Salary Amount *
                        </label>
                        <input
                          type="number"
                          id="salaryFixed"
                          name="salaryFixed"
                          value={jobData.salaryFixed}
                          onChange={handleInputChange}
                          className={`form-input ${errors.salaryFixed ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                          placeholder="65000"
                        />
                        {errors.salaryFixed && (
                          <p className="mt-1 text-sm text-red-600">{errors.salaryFixed}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Description</h2>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={8}
                    value={jobData.description}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.description ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    placeholder="Provide a detailed description of the role, company culture, and what makes this opportunity exciting..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {jobData.description.length}/2000 characters
                  </p>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Responsibilities</h2>
                
                <div className="space-y-4">
                  {jobData.responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) => handleArrayChange('responsibilities', index, e.target.value)}
                        className="form-input flex-1"
                        placeholder={`Responsibility ${index + 1}`}
                      />
                      {jobData.responsibilities.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('responsibilities', index)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('responsibilities')}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <FiPlus size={18} className="mr-2" />
                    Add Responsibility
                  </button>
                  {errors.responsibilities && (
                    <p className="text-sm text-red-600">{errors.responsibilities}</p>
                  )}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Requirements</h2>
                
                <div className="space-y-4">
                  {jobData.requirements.map((requirement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                        className="form-input flex-1"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {jobData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('requirements', index)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('requirements')}
                    className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
                  >
                    <FiPlus size={18} className="mr-2" />
                    Add Requirement
                  </button>
                  {errors.requirements && (
                    <p className="text-sm text-red-600">{errors.requirements}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Required Skills</h2>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {jobData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      className="form-input flex-1"
                      placeholder="Add a skill (e.g. React, TypeScript, Python)"
                    />
                    <button
                      type="button"
                      onClick={addSkill}
                      className="btn-primary flex items-center"
                    >
                      <FiPlus size={18} />
                    </button>
                  </div>
                  {errors.skills && (
                    <p className="text-sm text-red-600">{errors.skills}</p>
                  )}
                </div>
              </div>

              {/* Dates & Additional Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Dates & Additional Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      id="applicationDeadline"
                      name="applicationDeadline"
                      value={jobData.applicationDeadline}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`form-input ${errors.applicationDeadline ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    />
                    {errors.applicationDeadline && (
                      <p className="mt-1 text-sm text-red-600">{errors.applicationDeadline}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={jobData.contactEmail}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="hr@company.com"
                    />
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="urgentHiring"
                      name="urgentHiring"
                      checked={jobData.urgentHiring}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="urgentHiring" className="ml-2 text-sm text-gray-700">
                      Mark as urgent hiring
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={jobData.featured}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                      Feature this job (additional cost may apply)
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/my-jobs')}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('draft')}
                  disabled={saving}
                  className="btn-secondary flex items-center justify-center"
                >
                  {saving ? (
                    <LoadingSpinner size="sm" className="mr-2" />
                  ) : (
                    <FiSave size={18} className="mr-2" />
                  )}
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleSave('published')}
                  disabled={saving}
                  className="btn-primary flex items-center justify-center"
                >
                  {saving ? (
                    <LoadingSpinner size="sm" color="#ffffff" className="mr-2" />
                  ) : (
                    <FiUpload size={18} className="mr-2" />
                  )}
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddJob;
