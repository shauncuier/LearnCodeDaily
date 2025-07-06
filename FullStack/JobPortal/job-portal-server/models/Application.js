const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: [true, 'Job reference is required']
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Applicant reference is required']
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'reviewing', 'shortlisted', 'interviewing', 'accepted', 'rejected', 'withdrawn'],
      message: 'Status must be one of: pending, reviewing, shortlisted, interviewing, accepted, rejected, withdrawn'
    },
    default: 'pending'
  },
  documents: {
    resume: {
      filename: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    },
    coverLetter: {
      filename: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    },
    portfolio: {
      filename: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    },
    additional: [{
      name: String,
      filename: String,
      url: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  personalInfo: {
    phone: {
      type: String,
      match: [/^\+?[\d\s-()]{10,}$/, 'Please enter a valid phone number']
    },
    linkedinProfile: {
      type: String,
      match: [
        /^https:\/\/[a-z]{2,3}\.linkedin\.com\/.*$/,
        'Please enter a valid LinkedIn profile URL'
      ]
    },
    githubProfile: {
      type: String,
      match: [
        /^https:\/\/github\.com\/.*$/,
        'Please enter a valid GitHub profile URL'
      ]
    },
    portfolioWebsite: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        'Please enter a valid website URL'
      ]
    }
  },
  answers: [{
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true,
      maxlength: [1000, 'Answer cannot exceed 1000 characters']
    },
    type: {
      type: String,
      enum: ['text', 'textarea', 'multiple-choice', 'boolean'],
      default: 'text'
    }
  }],
  salaryExpectation: {
    amount: {
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
      default: true
    }
  },
  availability: {
    startDate: {
      type: Date,
      validate: {
        validator: function(value) {
          return !value || value >= new Date();
        },
        message: 'Start date must be in the future'
      }
    },
    noticePeriod: {
      type: String,
      enum: ['immediate', '1-week', '2-weeks', '1-month', '2-months', '3-months', 'other']
    },
    willRelocate: {
      type: Boolean,
      default: false
    }
  },
  source: {
    type: String,
    enum: ['direct', 'referral', 'job-board', 'social-media', 'company-website', 'recruiter', 'other'],
    default: 'direct'
  },
  referral: {
    referrerName: String,
    referrerEmail: String,
    relationship: String
  },
  timeline: [{
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'shortlisted', 'interviewing', 'accepted', 'rejected', 'withdrawn']
    },
    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    changedAt: {
      type: Date,
      default: Date.now
    },
    notes: String,
    automated: {
      type: Boolean,
      default: false
    }
  }],
  interviews: [{
    type: {
      type: String,
      enum: ['phone', 'video', 'in-person', 'technical', 'panel', 'final'],
      required: true
    },
    scheduledAt: {
      type: Date,
      required: true
    },
    duration: {
      type: Number, // in minutes
      default: 60
    },
    interviewer: {
      name: String,
      email: String,
      title: String
    },
    location: String,
    meetingLink: String,
    notes: String,
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled', 'rescheduled', 'no-show'],
      default: 'scheduled'
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comments: String,
      recommendation: {
        type: String,
        enum: ['hire', 'no-hire', 'maybe', 'pending']
      }
    }
  }],
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    strengths: [String],
    weaknesses: [String],
    overallComments: String,
    recommendation: {
      type: String,
      enum: ['hire', 'no-hire', 'maybe', 'pending']
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date
  },
  rejectionReason: {
    category: {
      type: String,
      enum: [
        'qualifications',
        'experience',
        'cultural-fit',
        'technical-skills',
        'communication',
        'availability',
        'salary-expectations',
        'other'
      ]
    },
    details: String,
    feedback: String
  },
  notes: [{
    content: {
      type: String,
      required: true,
      maxlength: [1000, 'Note cannot exceed 1000 characters']
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    },
    private: {
      type: Boolean,
      default: false
    }
  }],
  score: {
    overall: {
      type: Number,
      min: 0,
      max: 100
    },
    technical: {
      type: Number,
      min: 0,
      max: 100
    },
    cultural: {
      type: Number,
      min: 0,
      max: 100
    },
    communication: {
      type: Number,
      min: 0,
      max: 100
    }
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  viewedBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    viewedAt: {
      type: Date,
      default: Date.now
    }
  }],
  isBookmarked: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better performance
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true }); // Prevent duplicate applications
applicationSchema.index({ job: 1, status: 1 });
applicationSchema.index({ applicant: 1, status: 1 });
applicationSchema.index({ status: 1, createdAt: -1 });
applicationSchema.index({ 'timeline.status': 1, 'timeline.changedAt': -1 });
applicationSchema.index({ priority: 1, createdAt: -1 });
applicationSchema.index({ 'score.overall': -1 });

// Virtual for days since application
applicationSchema.virtual('daysSinceApplied').get(function() {
  const diffTime = Math.abs(new Date() - this.createdAt);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for current interview
applicationSchema.virtual('currentInterview').get(function() {
  const now = new Date();
  return this.interviews.find(interview => 
    interview.status === 'scheduled' && 
    interview.scheduledAt > now
  );
});

// Virtual for completion percentage
applicationSchema.virtual('completionPercentage').get(function() {
  let total = 5; // base fields
  let completed = 0;
  
  if (this.documents.resume.url) completed++;
  if (this.documents.coverLetter.url) completed++;
  if (this.personalInfo.phone) completed++;
  if (this.answers.length > 0) completed++;
  if (this.salaryExpectation.amount) completed++;
  
  return Math.round((completed / total) * 100);
});

// Pre-save middleware to add timeline entry when status changes
applicationSchema.pre('save', function(next) {
  if (this.isModified('status') && !this.isNew) {
    this.timeline.push({
      status: this.status,
      changedAt: new Date(),
      automated: true
    });
  }
  next();
});

// Instance method to update status with timeline
applicationSchema.methods.updateStatus = function(newStatus, changedBy, notes) {
  this.status = newStatus;
  this.timeline.push({
    status: newStatus,
    changedBy,
    changedAt: new Date(),
    notes,
    automated: false
  });
  return this.save();
};

// Instance method to add note
applicationSchema.methods.addNote = function(content, addedBy, isPrivate = false) {
  this.notes.push({
    content,
    addedBy,
    private: isPrivate
  });
  return this.save();
};

// Instance method to schedule interview
applicationSchema.methods.scheduleInterview = function(interviewData) {
  this.interviews.push(interviewData);
  if (this.status === 'pending' || this.status === 'reviewing') {
    this.status = 'interviewing';
  }
  return this.save();
};

// Static method to get applications by job with filters
applicationSchema.statics.findByJob = function(jobId, filters = {}) {
  const query = { job: jobId };
  
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;
  if (filters.minScore) query['score.overall'] = { $gte: filters.minScore };
  
  return this.find(query)
    .populate('applicant', 'name email profile.avatar profile.phone')
    .populate('job', 'title company.name')
    .sort({ createdAt: -1 });
};

// Static method to get applications by user
applicationSchema.statics.findByUser = function(userId, filters = {}) {
  const query = { applicant: userId };
  
  if (filters.status) query.status = filters.status;
  
  return this.find(query)
    .populate('job', 'title company.name location.city employment.type salary status')
    .sort({ createdAt: -1 });
};

// Transform JSON output
applicationSchema.methods.toJSON = function() {
  const application = this.toObject({ virtuals: true });
  return application;
};

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
