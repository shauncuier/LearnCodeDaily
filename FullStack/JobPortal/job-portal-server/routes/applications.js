const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Apply for a job
router.post('/:jobId/apply', auth, async (req, res) => {
  try {
    const { jobId } = req.params;
    const applicantId = req.user.userId;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: applicantId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create application
    const application = new Application({
      job: jobId,
      applicant: applicantId,
      ...req.body
    });

    await application.save();

    // Increment job applications count
    job.applicationsCount = (job.applicationsCount || 0) + 1;
    await job.save();

    const populatedApplication = await Application.findById(application._id)
      .populate('job', 'title company.name')
      .populate('applicant', 'name email');

    res.status(201).json({
      message: 'Application submitted successfully',
      application: populatedApplication
    });
  } catch (error) {
    console.error('Apply job error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's applications
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.findByUser(req.user.userId);
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get applications for a specific job (employer only)
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    const { jobId } = req.params;

    // Check if job exists and user owns it
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }

    const applications = await Application.findByJob(jobId, req.query);
    res.json(applications);
  } catch (error) {
    console.error('Get job applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update application status (employer only)
router.put('/:applicationId/status', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findById(applicationId)
      .populate('job', 'postedBy');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the job
    if (application.job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    await application.updateStatus(status, req.user.userId, req.body.notes);

    res.json({
      message: 'Application status updated successfully',
      application
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete application (applicant only)
router.delete('/:applicationId', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if user owns the application
    if (application.applicant.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this application' });
    }

    await Application.findByIdAndDelete(applicationId);

    // Decrement job applications count
    const job = await Job.findById(application.job);
    if (job) {
      job.applicationsCount = Math.max(0, (job.applicationsCount || 1) - 1);
      await job.save();
    }

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single application
router.get('/:applicationId', auth, async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate('job', 'title company.name postedBy')
      .populate('applicant', 'name email profile.phone');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check authorization
    const isApplicant = application.applicant._id.toString() === req.user.userId;
    const isJobOwner = application.job.postedBy.toString() === req.user.userId;

    if (!isApplicant && !isJobOwner) {
      return res.status(403).json({ message: 'Not authorized to view this application' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
