const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
    maxlength: [100, 'Job title cannot exceed 100 characters']
  },
  company: {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    logo: String,
    website: String,
    industry: String,
    size: {
      type: String,
      enum: ['1-10', '11-50', '51-200', '201-1000', '1000+']
    }
  },
  location: {
    type: {
      type: String,
      enum: ['remote', 'on-site', 'hybrid'],
      required: true
    },
    city: String,
    state: String,
    country: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
    maxlength: [5000, 'Job description cannot exceed 5000 characters']
  },
  requirements: {
    type: String,
    required: [true, 'Job requirements are required'],
    maxlength: [3000, 'Job requirements cannot exceed 3000 characters']
  },
  responsibilities: {
    type: String,
    maxlength: [3000, 'Job responsibilities cannot exceed 3000 characters']
  },
  benefits: {
    type: String,
    maxlength: [2000, 'Job benefits cannot exceed 2000 characters']
  },
  qualifications: {
    education: {
      type: String,
      enum: ['High School', 'Associate', 'Bachelor', 'Master', 'PhD', 'Certification', 'Not Required']
    },
    experience: {
      min: {
        type: Number,
        min: 0,
        max: 50
      },
      max: {
        type: Number,
        min: 0,
        max: 50
      }
    },
    skills: [{
      name: {
        type: String,
        trim: true
      },
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
      },
      required: {
        type: Boolean,
        default: false
      }
    }]
  },
  employment: {
    type: {
      type: String,
      enum: ['full-time', 'part-time', 'contract', 'temporary', 'internship', 'freelance'],
      required: true
    },
    schedule: {
      type: String,
      enum: ['day-shift', 'night-shift', 'flexible', 'rotating']
    }
  },
  salary: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'INR']
    },
    period: {
      type: String,
      enum: ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
      default: 'yearly'
    },
    negotiable: {
      type: Boolean,
      default: false
    }
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Technology',
      'Marketing',
      'Sales',
      'Design',
      'Finance',
      'Healthcare',
      'Education',
      'Engineering',
      'Human Resources',
      'Operations',
      'Customer Service',
      'Legal',
      'Research',
      'Manufacturing',
      'Other'
    ]
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  applicationDeadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Application deadline must be in the future'
    }
  },
  applicationMethod: {
    type: {
      type: String,
      enum: ['internal', 'external', 'email'],
      default: 'internal'
    },
    externalUrl: String,
    email: String,
    instructions: String
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'closed', 'filled'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  urgent: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  applications: {
    count: {
      type: Number,
      default: 0
    },
    limit: {
      type: Number,
      min: 1,
      max: 1000
    }
  },
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    }
  }
}, {
  timestamps: true
});

// Indexes for better performance
jobSchema.index({ title: 'text', description: 'text', 'company.name': 'text' });
jobSchema.index({ category: 1 });
jobSchema.index({ 'employment.type': 1 });
jobSchema.index({ 'location.type': 1 });
jobSchema.index({ status: 1 });
jobSchema.index({ featured: 1 });
jobSchema.index({ urgent: 1 });
jobSchema.index({ createdAt: -1 });
jobSchema.index({ applicationDeadline: 1 });
jobSchema.index({ expiresAt: 1 });
jobSchema.index({ postedBy: 1 });
jobSchema.index({ tags: 1 });
jobSchema.index({ 'qualifications.skills.name': 1 });

// Compound indexes
jobSchema.index({ category: 1, status: 1, createdAt: -1 });
jobSchema.index({ 'location.city': 1, 'location.state': 1, status: 1 });

// Virtual for formatted salary range
jobSchema.virtual('salaryRange').get(function() {
  if (!this.salary.min && !this.salary.max) return 'Not specified';
  
  const formatSalary = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}k`;
    return `$${amount}`;
  };
  
  if (this.salary.min && this.salary.max) {
    return `${formatSalary(this.salary.min)} - ${formatSalary(this.salary.max)}`;
  } else if (this.salary.min) {
    return `From ${formatSalary(this.salary.min)}`;
  } else if (this.salary.max) {
    return `Up to ${formatSalary(this.salary.max)}`;
  }
});

// Virtual for days since posted
jobSchema.virtual('daysSincePosted').get(function() {
  const diffTime = Math.abs(new Date() - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for application deadline status
jobSchema.virtual('isDeadlinePassed').get(function() {
  if (!this.applicationDeadline) return false;
  return new Date() > this.applicationDeadline;
});

// Virtual for job expiry status
jobSchema.virtual('isExpired').get(function() {
  return new Date() > this.expiresAt;
});

// Pre-save middleware to auto-close expired jobs
jobSchema.pre('save', function(next) {
  if (this.isExpired && this.status === 'active') {
    this.status = 'closed';
  }
  next();
});

// Instance method to increment view count
jobSchema.methods.incrementViews = function() {
  return this.updateOne({ $inc: { views: 1 } });
};

// Instance method to increment application count
jobSchema.methods.incrementApplications = function() {
  return this.updateOne({ $inc: { 'applications.count': 1 } });
};

// Instance method to check if applications are still accepted
jobSchema.methods.canAcceptApplications = function() {
  if (this.status !== 'active') return false;
  if (this.isExpired) return false;
  if (this.isDeadlinePassed) return false;
  if (this.applications.limit && this.applications.count >= this.applications.limit) return false;
  return true;
};

// Static method to find active jobs with filters
jobSchema.statics.findActiveJobs = function(filters = {}) {
  const query = { status: 'active', expiresAt: { $gt: new Date() } };
  
  if (filters.category) query.category = filters.category;
  if (filters.location) {
    query.$or = [
      { 'location.city': new RegExp(filters.location, 'i') },
      { 'location.state': new RegExp(filters.location, 'i') },
      { 'location.country': new RegExp(filters.location, 'i') }
    ];
  }
  if (filters.employmentType) query['employment.type'] = filters.employmentType;
  if (filters.remote !== undefined) {
    query['location.type'] = filters.remote ? 'remote' : { $ne: 'remote' };
  }
  if (filters.salaryMin) query['salary.min'] = { $gte: filters.salaryMin };
  if (filters.salaryMax) query['salary.max'] = { $lte: filters.salaryMax };
  
  return this.find(query).populate('postedBy', 'name email company.name company.logo');
};

// Transform JSON output
jobSchema.methods.toJSON = function() {
  const job = this.toObject({ virtuals: true });
  return job;
};

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
