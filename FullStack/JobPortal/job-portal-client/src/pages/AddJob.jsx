import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Helmet from '../components/ui/Helmet';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { FiDollarSign, FiMapPin, FiBriefcase, FiClock, FiUsers } from 'react-icons/fi';

const AddJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch
  } = useForm();

  const salaryMin = watch('salaryMin');
  const salaryMax = watch('salaryMax');

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Validate salary range
      if (data.salaryMin && data.salaryMax && Number(data.salaryMin) > Number(data.salaryMax)) {
        setError('salaryMax', {
          type: 'manual',
          message: 'Maximum salary must be greater than minimum salary'
        });
        setIsLoading(false);
        return;
      }

      const jobData = {
        title: data.title,
        company: {
          name: data.companyName,
          industry: data.industry,
          size: data.companySize
        },
        location: {
          type: data.locationType,
          city: data.city,
          state: data.state,
          country: data.country || 'United States'
        },
        description: data.description,
        requirements: data.requirements,
        responsibilities: data.responsibilities,
        benefits: data.benefits,
        qualifications: {
          education: data.education,
          experience: {
            min: data.experienceMin ? Number(data.experienceMin) : 0,
            max: data.experienceMax ? Number(data.experienceMax) : null
          }
        },
        employment: {
          type: data.employmentType,
          schedule: data.schedule
        },
        salary: {
          min: data.salaryMin ? Number(data.salaryMin) : null,
          max: data.salaryMax ? Number(data.salaryMax) : null,
          currency: data.currency || 'USD',
          period: data.salaryPeriod || 'yearly',
          negotiable: data.salaryNegotiable || false
        },
        category: data.category,
        applicationDeadline: data.applicationDeadline ? new Date(data.applicationDeadline) : null,
        contactInfo: {
          name: data.contactName,
          email: data.contactEmail,
          phone: data.contactPhone
        }
      };

      await api.post('/jobs', jobData);
      navigate('/jobs', { 
        state: { message: 'Job posted successfully!' }
      });
    } catch (error) {
      setError('root', {
        message: error.response?.data?.message || 'Failed to post job. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'employer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">You must be an employer to post jobs.</p>
          <button
            onClick={() => navigate('/jobs')}
            className="btn-primary"
          >
            Browse Jobs
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet 
        title="Post a Job"
        description="Post your job opening and find qualified candidates on Career Code."
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h1>
              <p className="text-gray-600">
                Fill out the details below to post your job opening and attract qualified candidates.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Job Details Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiBriefcase className="w-5 h-5 mr-2" />
                  Job Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="form-label">Job Title *</label>
                    <input
                      type="text"
                      {...register('title', { required: 'Job title is required' })}
                      className={`form-input ${errors.title ? 'border-red-300' : ''}`}
                      placeholder="e.g. Senior Frontend Developer"
                    />
                    {errors.title && <p className="form-error">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Company Name *</label>
                    <input
                      type="text"
                      {...register('companyName', { required: 'Company name is required' })}
                      className={`form-input ${errors.companyName ? 'border-red-300' : ''}`}
                      placeholder="Your company name"
                    />
                    {errors.companyName && <p className="form-error">{errors.companyName.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Industry</label>
                    <input
                      type="text"
                      {...register('industry')}
                      className="form-input"
                      placeholder="e.g. Technology, Healthcare"
                    />
                  </div>

                  <div>
                    <label className="form-label">Category *</label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className={`form-select ${errors.category ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select category</option>
                      <option value="Technology">Technology</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="Design">Design</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Engineering">Engineering</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Operations">Operations</option>
                      <option value="Customer Service">Customer Service</option>
                      <option value="Legal">Legal</option>
                      <option value="Research">Research</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.category && <p className="form-error">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Company Size</label>
                    <select {...register('companySize')} className="form-select">
                      <option value="">Select size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiMapPin className="w-5 h-5 mr-2" />
                  Location
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Location Type *</label>
                    <select
                      {...register('locationType', { required: 'Location type is required' })}
                      className={`form-select ${errors.locationType ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select type</option>
                      <option value="remote">Remote</option>
                      <option value="on-site">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                    {errors.locationType && <p className="form-error">{errors.locationType.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      {...register('city')}
                      className="form-input"
                      placeholder="e.g. New York"
                    />
                  </div>

                  <div>
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      {...register('state')}
                      className="form-input"
                      placeholder="e.g. NY"
                    />
                  </div>

                  <div>
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      {...register('country')}
                      className="form-input"
                      placeholder="e.g. United States"
                      defaultValue="United States"
                    />
                  </div>
                </div>
              </div>

              {/* Employment Details */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiClock className="w-5 h-5 mr-2" />
                  Employment Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Employment Type *</label>
                    <select
                      {...register('employmentType', { required: 'Employment type is required' })}
                      className={`form-select ${errors.employmentType ? 'border-red-300' : ''}`}
                    >
                      <option value="">Select type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="temporary">Temporary</option>
                      <option value="internship">Internship</option>
                      <option value="freelance">Freelance</option>
                    </select>
                    {errors.employmentType && <p className="form-error">{errors.employmentType.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Schedule</label>
                    <select {...register('schedule')} className="form-select">
                      <option value="">Select schedule</option>
                      <option value="day-shift">Day shift</option>
                      <option value="night-shift">Night shift</option>
                      <option value="flexible">Flexible</option>
                      <option value="rotating">Rotating</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Application Deadline</label>
                    <input
                      type="date"
                      {...register('applicationDeadline')}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Salary Section */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiDollarSign className="w-5 h-5 mr-2" />
                  Salary Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label">Minimum Salary</label>
                    <input
                      type="number"
                      {...register('salaryMin', { min: 0 })}
                      className="form-input"
                      placeholder="50000"
                    />
                  </div>

                  <div>
                    <label className="form-label">Maximum Salary</label>
                    <input
                      type="number"
                      {...register('salaryMax', { min: 0 })}
                      className={`form-input ${errors.salaryMax ? 'border-red-300' : ''}`}
                      placeholder="80000"
                    />
                    {errors.salaryMax && <p className="form-error">{errors.salaryMax.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Period</label>
                    <select {...register('salaryPeriod')} className="form-select">
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                      <option value="weekly">Weekly</option>
                      <option value="hourly">Hourly</option>
                    </select>
                  </div>

                  <div className="md:col-span-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        {...register('salaryNegotiable')}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Salary is negotiable</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-6">
                <div>
                  <label className="form-label">Job Description *</label>
                  <textarea
                    {...register('description', { required: 'Job description is required' })}
                    rows={6}
                    className={`form-textarea ${errors.description ? 'border-red-300' : ''}`}
                    placeholder="Describe the job role, company culture, and what makes this opportunity exciting..."
                  />
                  {errors.description && <p className="form-error">{errors.description.message}</p>}
                </div>

                <div>
                  <label className="form-label">Requirements *</label>
                  <textarea
                    {...register('requirements', { required: 'Requirements are required' })}
                    rows={4}
                    className={`form-textarea ${errors.requirements ? 'border-red-300' : ''}`}
                    placeholder="List the required skills, experience, and qualifications..."
                  />
                  {errors.requirements && <p className="form-error">{errors.requirements.message}</p>}
                </div>

                <div>
                  <label className="form-label">Responsibilities</label>
                  <textarea
                    {...register('responsibilities')}
                    rows={4}
                    className="form-textarea"
                    placeholder="Describe the key responsibilities and duties..."
                  />
                </div>

                <div>
                  <label className="form-label">Benefits</label>
                  <textarea
                    {...register('benefits')}
                    rows={3}
                    className="form-textarea"
                    placeholder="Health insurance, retirement plans, flexible hours, etc."
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div className="border-b border-gray-200 pb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <FiUsers className="w-5 h-5 mr-2" />
                  Qualifications
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label">Education Level</label>
                    <select {...register('education')} className="form-select">
                      <option value="">Select level</option>
                      <option value="High School">High School</option>
                      <option value="Associate">Associate Degree</option>
                      <option value="Bachelor">Bachelor's Degree</option>
                      <option value="Master">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Certification">Certification</option>
                      <option value="Not Required">Not Required</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Min Experience (years)</label>
                    <input
                      type="number"
                      {...register('experienceMin', { min: 0, max: 50 })}
                      className="form-input"
                      placeholder="0"
                      min="0"
                      max="50"
                    />
                  </div>

                  <div>
                    <label className="form-label">Max Experience (years)</label>
                    <input
                      type="number"
                      {...register('experienceMax', { min: 0, max: 50 })}
                      className="form-input"
                      placeholder="10"
                      min="0"
                      max="50"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label">Contact Name</label>
                    <input
                      type="text"
                      {...register('contactName')}
                      className="form-input"
                      placeholder="HR Manager name"
                    />
                  </div>

                  <div>
                    <label className="form-label">Contact Email</label>
                    <input
                      type="email"
                      {...register('contactEmail')}
                      className="form-input"
                      placeholder="hr@company.com"
                    />
                  </div>

                  <div>
                    <label className="form-label">Contact Phone</label>
                    <input
                      type="tel"
                      {...register('contactPhone')}
                      className="form-input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errors.root && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-8">
                <button
                  type="button"
                  onClick={() => navigate('/jobs')}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Posting Job...
                    </>
                  ) : (
                    'Post Job'
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

export default AddJob;
