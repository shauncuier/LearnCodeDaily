import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageSquare,
  FiUser,
  FiHelpCircle
} from 'react-icons/fi';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = [
    { value: '', label: 'Select a category' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payments' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'bug', label: 'Report a Bug' },
    { value: 'other', label: 'Other' }
  ];

  const contactInfo = [
    {
      icon: FiMail,
      title: 'Email Us',
      content: 'support@careercode.com',
      description: 'Send us an email and we\'ll respond within 24 hours',
      action: 'mailto:support@careercode.com'
    },
    {
      icon: FiPhone,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      description: 'Mon-Fri from 8am to 6pm PST',
      action: 'tel:+15551234567'
    },
    {
      icon: FiMapPin,
      title: 'Visit Us',
      content: '123 Innovation Drive\nSan Francisco, CA 94105',
      description: 'Come visit our headquarters',
      action: 'https://maps.google.com'
    },
    {
      icon: FiClock,
      title: 'Business Hours',
      content: 'Monday - Friday\n8:00 AM - 6:00 PM PST',
      description: 'We\'re here to help during business hours'
    }
  ];

  const faqItems = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Sign Up" button in the top right corner and follow the registration process. You can sign up using your email or Google account.'
    },
    {
      question: 'Is Career Code free to use?',
      answer: 'Yes, creating an account and applying for jobs is completely free for job seekers. We only charge employers for posting jobs and accessing premium features.'
    },
    {
      question: 'How do I apply for a job?',
      answer: 'Find a job you\'re interested in, click "View Details", then click "Apply Now". You\'ll need to upload your resume and fill out the application form.'
    },
    {
      question: 'Can I edit my application after submitting?',
      answer: 'Once submitted, applications cannot be edited. However, you can update your profile and resume for future applications.'
    },
    {
      question: 'How do I track my applications?',
      answer: 'Go to "My Applications" in your dashboard to see the status of all your job applications and any updates from employers.'
    },
    {
      question: 'What file formats are accepted for resumes?',
      answer: 'We accept PDF, DOC, and DOCX files up to 5MB in size. PDF is recommended for the best formatting preservation.'
    }
  ];

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Career Code</title>
        <meta name="description" content="Get in touch with Career Code. We're here to help with any questions about our job platform, technical support, or partnerships." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
          <div className="container-custom py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                We're here to help! Reach out to us with any questions, feedback, or support needs.
              </p>
            </div>
          </div>
        </section>

        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="flex items-center mb-8">
                  <FiMessageSquare size={24} className="text-primary-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`form-input pl-10 ${errors.name ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`form-input pl-10 ${errors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                          placeholder="john.doe@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`form-select ${errors.category ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`form-input ${errors.subject ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Brief description of your inquiry"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className={`form-textarea ${errors.message ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}`}
                      placeholder="Please provide details about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.message.length}/1000 characters
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    {submitting ? (
                      <>
                        <LoadingSpinner size="sm" color="#ffffff" className="mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={18} className="mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                        <info.icon size={20} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{info.title}</h4>
                        {info.action ? (
                          <a
                            href={info.action}
                            target={info.action.startsWith('http') ? '_blank' : undefined}
                            rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-primary-600 hover:text-primary-700 transition-colors duration-200 whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-primary-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <FiClock size={20} className="text-primary-600 mr-2" />
                  <h3 className="font-semibold text-gray-900">Response Time</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent technical issues, please call our support line directly.
                </p>
              </div>

              {/* Office Hours */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="text-gray-900">8:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="text-gray-900">10:00 AM - 4:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <FiHelpCircle size={24} className="text-primary-600 mr-2" />
                <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
              </div>
              <p className="text-xl text-gray-600">
                Find quick answers to common questions
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="divide-y divide-gray-200">
                {faqItems.map((faq, index) => (
                  <div key={index} className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alternative Contact Methods */}
          <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Need Immediate Help?</h2>
            <p className="text-primary-100 mb-6">
              For urgent technical issues or time-sensitive inquiries, you can reach us directly:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="btn-secondary flex items-center justify-center"
              >
                <FiPhone size={18} className="mr-2" />
                Call Support
              </a>
              <a
                href="mailto:urgent@careercode.com"
                className="btn-outline flex items-center justify-center"
              >
                <FiMail size={18} className="mr-2" />
                Urgent Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
