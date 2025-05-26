import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiGlobe,
  FiGithub,
  FiLinkedin,
  FiEdit2,
  FiSave,
  FiX,
  FiUpload,
  FiDownload,
  FiTrash2,
  FiPlus,
  FiBriefcase,
  FiGraduationCap,
  FiAward
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { userAPI, uploadAPI } from '../../services/api';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    bio: '',
    profilePicture: '',
    resume: null,
    skills: [],
    experience: [],
    education: [],
    preferences: {
      jobType: '',
      salaryRange: '',
      location: '',
      remote: false
    }
  });

  const [newSkill, setNewSkill] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getProfile();
      setProfile(response.profile || {});
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Initialize with user data
      setProfile(prev => ({
        ...prev,
        firstName: user?.displayName?.split(' ')[0] || '',
        lastName: user?.displayName?.split(' ')[1] || '',
        email: user?.email || '',
        profilePicture: user?.photoURL || '',
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        experience: [
          {
            id: '1',
            title: 'Senior Frontend Developer',
            company: 'Tech Solutions Inc.',
            location: 'San Francisco, CA',
            startDate: '2022-01',
            endDate: '',
            current: true,
            description: 'Leading frontend development team and building scalable React applications.'
          },
          {
            id: '2',
            title: 'Frontend Developer',
            company: 'StartupCo',
            location: 'New York, NY',
            startDate: '2020-03',
            endDate: '2021-12',
            current: false,
            description: 'Developed responsive web applications using modern JavaScript frameworks.'
          }
        ],
        education: [
          {
            id: '1',
            degree: 'Bachelor of Science in Computer Science',
            school: 'University of California, Berkeley',
            location: 'Berkeley, CA',
            startDate: '2016-09',
            endDate: '2020-05',
            gpa: '3.8'
          }
        ],
        preferences: {
          jobType: 'Full-time',
          salaryRange: '$120k - $150k',
          location: 'San Francisco, CA',
          remote: true
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    // Clear error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProfilePictureUpload = async (file) => {
    if (!file) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (file.size > maxSize) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, and WebP images are allowed');
      return;
    }

    setUploadingProfilePic(true);
    try {
      const response = await uploadAPI.uploadFile(file, 'profile-picture');
      setProfile(prev => ({
        ...prev,
        profilePicture: response.url
      }));
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload profile picture');
    } finally {
      setUploadingProfilePic(false);
    }
  };

  const handleResumeUpload = async (file) => {
    if (!file) return;

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

    setUploadingResume(true);
    try {
      const response = await uploadAPI.uploadFile(file, 'resume');
      setProfile(prev => ({
        ...prev,
        resume: {
          name: file.name,
          url: response.url,
          uploadedAt: new Date().toISOString()
        }
      }));
      toast.success('Resume updated successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateProfile = () => {
    const newErrors = {};

    if (!profile.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!profile.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!profile.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateProfile()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    setSaving(true);
    try {
      await userAPI.updateProfile(profile);
      await updateUserProfile({
        displayName: `${profile.firstName} ${profile.lastName}`,
        photoURL: profile.profilePicture
      });
      
      toast.success('Profile updated successfully');
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    fetchProfile(); // Reset to original data
    setErrors({});
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Profile - Career Code</title>
        <meta name="description" content="Manage your profile and job preferences" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container-custom py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                <p className="text-gray-600">
                  Manage your personal information and job preferences
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                {editing ? (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleCancel}
                      className="btn-secondary flex items-center"
                    >
                      <FiX size={18} className="mr-2" />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn-primary flex items-center"
                    >
                      {saving ? (
                        <LoadingSpinner size="sm" color="#ffffff" className="mr-2" />
                      ) : (
                        <FiSave size={18} className="mr-2" />
                      )}
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="btn-primary flex items-center"
                  >
                    <FiEdit2 size={18} className="mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                {/* Profile Picture */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <img
                      src={profile.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${profile.firstName} ${profile.lastName}`)}&size=128&background=6366f1&color=ffffff`}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover mx-auto"
                    />
                    {editing && (
                      <label className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full cursor-pointer hover:bg-primary-700 transition-colors duration-200">
                        <FiUpload size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProfilePictureUpload(e.target.files[0])}
                          className="hidden"
                          disabled={uploadingProfilePic}
                        />
                      </label>
                    )}
                    {uploadingProfilePic && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <LoadingSpinner size="sm" color="#ffffff" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4">
                    {profile.firstName} {profile.lastName}
                  </h3>
                  <p className="text-gray-600">{profile.email}</p>
                </div>

                {/* Quick Links */}
                <div className="space-y-3">
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FiLinkedin size={18} className="mr-3" />
                      LinkedIn Profile
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FiGithub size={18} className="mr-3" />
                      GitHub Profile
                    </a>
                  )}
                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      <FiGlobe size={18} className="mr-3" />
                      Personal Website
                    </a>
                  )}
                </div>

                {/* Resume */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Resume</h4>
                  {profile.resume ? (
                    <div className="border border-gray-300 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FiDownload size={16} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">{profile.resume.name}</span>
                        </div>
                        {editing && (
                          <button
                            onClick={() => setProfile(prev => ({ ...prev, resume: null }))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        )}
                      </div>
                      <a
                        href={profile.resume.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary-600 hover:text-primary-700 block mt-1"
                      >
                        Download Resume
                      </a>
                    </div>
                  ) : editing ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleResumeUpload(e.target.files[0])}
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
                          <FiUpload size={20} className="text-gray-400 mb-1" />
                        )}
                        <span className="text-sm text-gray-600">
                          {uploadingResume ? 'Uploading...' : 'Upload Resume'}
                        </span>
                      </label>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No resume uploaded</p>
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleInputChange}
                        className={`form-input ${errors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="John"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.firstName || 'Not provided'}</p>
                    )}
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleInputChange}
                        className={`form-input ${errors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="Doe"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.lastName || 'Not provided'}</p>
                    )}
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    {editing ? (
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                        className={`form-input ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                        placeholder="john.doe@example.com"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.email || 'Not provided'}</p>
                    )}
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="+1 (555) 123-4567"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="San Francisco, CA"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.location || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    {editing ? (
                      <input
                        type="url"
                        name="website"
                        value={profile.website}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="https://yourwebsite.com"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.website || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {editing ? (
                    <textarea
                      name="bio"
                      rows={4}
                      value={profile.bio}
                      onChange={handleInputChange}
                      className="form-textarea"
                      placeholder="Tell us about yourself, your experience, and what you're looking for..."
                    />
                  ) : (
                    <p className="text-gray-900">{profile.bio || 'No bio provided'}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills?.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                    >
                      {skill}
                      {editing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-primary-600 hover:text-primary-800"
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>

                {editing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="form-input flex-1"
                      placeholder="Add a skill"
                    />
                    <button
                      onClick={addSkill}
                      className="btn-primary flex items-center"
                    >
                      <FiPlus size={18} />
                    </button>
                  </div>
                )}
              </div>

              {/* Job Preferences */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Job Preferences</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Job Type
                    </label>
                    {editing ? (
                      <select
                        name="preferences.jobType"
                        value={profile.preferences?.jobType || ''}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="">Select job type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">{profile.preferences?.jobType || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="preferences.salaryRange"
                        value={profile.preferences?.salaryRange || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="$80k - $120k"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.preferences?.salaryRange || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Location
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="preferences.location"
                        value={profile.preferences?.location || ''}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="San Francisco, CA"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.preferences?.location || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center">
                      {editing ? (
                        <input
                          type="checkbox"
                          name="preferences.remote"
                          checked={profile.preferences?.remote || false}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                      ) : (
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                          profile.preferences?.remote ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
                        }`}>
                          {profile.preferences?.remote && (
                            <FiX size={12} className="text-white" />
                          )}
                        </div>
                      )}
                      <span className="ml-2 text-sm text-gray-700">Open to remote work</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
