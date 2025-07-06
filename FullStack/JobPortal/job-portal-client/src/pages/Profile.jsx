import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Helmet from '../components/ui/Helmet';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiGlobe, 
  FiLinkedin, 
  FiGithub,
  FiEdit3,
  FiSave,
  FiX,
  FiBriefcase,
  FiCalendar
} from 'react-icons/fi';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await authAPI.getProfile();
      setProfile(response.data);
      reset(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const response = await authAPI.updateProfile(data);
      setProfile(response.data);
      updateUser(response.data);
      setEditing(false);
      reset(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('root', {
        message: error.response?.data?.message || 'Failed to update profile'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    reset(profile);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Helmet 
        title="My Profile"
        description="Manage your profile information and account settings."
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                <p className="text-lg text-gray-600">
                  Manage your personal information and account settings
                </p>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FiEdit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Full Name</label>
                    {editing ? (
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className={`form-input pl-10 ${errors.name ? 'border-red-300' : ''}`}
                          placeholder="Enter your full name"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 mt-1">{profile?.name || 'Not provided'}</p>
                    )}
                    {errors.name && <p className="form-error">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="form-label">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={profile?.email || ''}
                        disabled
                        className="form-input pl-10 bg-gray-50 text-gray-500 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Phone</label>
                    {editing ? (
                      <div className="relative">
                        <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          {...register('profile.phone')}
                          className="form-input pl-10"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 mt-1">{profile?.profile?.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Location</label>
                    {editing ? (
                      <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          {...register('profile.location')}
                          className="form-input pl-10"
                          placeholder="City, State, Country"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 mt-1">{profile?.profile?.location || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">Bio</label>
                  {editing ? (
                    <textarea
                      {...register('profile.bio')}
                      rows={4}
                      className="form-textarea"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900 mt-1 whitespace-pre-line">
                      {profile?.profile?.bio || 'No bio provided'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Information */}
            {user?.role === 'job_seeker' && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Professional Information</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="form-label">Current Job Title</label>
                      {editing ? (
                        <div className="relative">
                          <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type="text"
                            {...register('profile.jobTitle')}
                            className="form-input pl-10"
                            placeholder="e.g. Software Engineer"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-900 mt-1">{profile?.profile?.jobTitle || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="form-label">Experience Level</label>
                      {editing ? (
                        <select
                          {...register('profile.experience')}
                          className="form-select"
                        >
                          <option value="">Select experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="mid">Mid Level (2-5 years)</option>
                          <option value="senior">Senior Level (5-10 years)</option>
                          <option value="lead">Lead/Principal (10+ years)</option>
                        </select>
                      ) : (
                        <p className="text-gray-900 mt-1">
                          {profile?.profile?.experience 
                            ? profile.profile.experience.charAt(0).toUpperCase() + profile.profile.experience.slice(1)
                            : 'Not provided'
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Skills</label>
                    {editing ? (
                      <input
                        type="text"
                        {...register('profile.skills')}
                        className="form-input"
                        placeholder="e.g. JavaScript, React, Node.js (comma separated)"
                      />
                    ) : (
                      <div className="mt-1">
                        {profile?.profile?.skills ? (
                          <div className="flex flex-wrap gap-2">
                            {profile.profile.skills.split(',').map((skill, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded"
                              >
                                {skill.trim()}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-900">No skills listed</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Social Links</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">LinkedIn Profile</label>
                    {editing ? (
                      <div className="relative">
                        <FiLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="url"
                          {...register('profile.linkedin')}
                          className="form-input pl-10"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 mt-1">
                        {profile?.profile?.linkedin ? (
                          <a 
                            href={profile.profile.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-500"
                          >
                            {profile.profile.linkedin}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">GitHub Profile</label>
                    {editing ? (
                      <div className="relative">
                        <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="url"
                          {...register('profile.github')}
                          className="form-input pl-10"
                          placeholder="https://github.com/username"
                        />
                      </div>
                    ) : (
                      <p className="text-gray-900 mt-1">
                        {profile?.profile?.github ? (
                          <a 
                            href={profile.profile.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-500"
                          >
                            {profile.profile.github}
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="form-label">Portfolio Website</label>
                  {editing ? (
                    <div className="relative">
                      <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="url"
                        {...register('profile.website')}
                        className="form-input pl-10"
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-900 mt-1">
                      {profile?.profile?.website ? (
                        <a 
                          href={profile.profile.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-500"
                        >
                          {profile.profile.website}
                        </a>
                      ) : (
                        'Not provided'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Account Information</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Account Type</label>
                    <p className="text-gray-900 mt-1 capitalize">
                      {user?.role?.replace('_', ' ') || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <label className="form-label">Member Since</label>
                    <p className="text-gray-900 mt-1">
                      {profile?.createdAt 
                        ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : 'Unknown'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}

            {/* Action Buttons */}
            {editing && (
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FiX className="w-4 h-4 mr-2 inline" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 inline-block"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave className="w-4 h-4 mr-2 inline" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
