const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/job-portal';

async function seedData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB for seeding...');
    
    const db = client.db();

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('jobs').deleteMany({});
    await db.collection('applications').deleteMany({});
    console.log('Cleared existing data');

    // Sample Users
    const users = [
      {
        _id: new ObjectId(),
        name: "Tech Corp HR",
        email: "hr@techcorp.com",
        password: "password123", // In production, this should be hashed
        userType: "employer",
        company: "Tech Corp",
        skills: null,
        experience: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Startup Inc HR",
        email: "hr@startup.com",
        password: "password123",
        userType: "employer",
        company: "Startup Inc",
        skills: null,
        experience: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        userType: "jobseeker",
        company: null,
        skills: ["JavaScript", "React", "Node.js", "MongoDB"],
        experience: "3 years",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        userType: "jobseeker",
        company: null,
        skills: ["Python", "Django", "PostgreSQL", "Docker"],
        experience: "5 years",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Mike Johnson",
        email: "mike@example.com",
        password: "password123",
        userType: "jobseeker",
        company: null,
        skills: ["Java", "Spring Boot", "MySQL", "AWS"],
        experience: "2 years",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const userResult = await db.collection('users').insertMany(users);
    console.log(`Inserted ${Object.keys(userResult.insertedIds).length} users`);

    // Get employer and jobseeker IDs
    const employers = users.filter(u => u.userType === 'employer');
    const jobseekers = users.filter(u => u.userType === 'jobseeker');

    // Sample Jobs
    const jobs = [
      {
        _id: new ObjectId(),
        title: "Frontend Developer",
        description: "We are looking for a skilled frontend developer to join our team. You will be responsible for building user interfaces using modern web technologies.",
        company: "Tech Corp",
        location: "New York, NY",
        salary: 75000,
        requirements: ["React", "JavaScript", "CSS", "HTML"],
        employerId: employers[0]._id,
        status: "active",
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        title: "Backend Developer",
        description: "Join our backend team to build scalable APIs and microservices. Experience with Node.js and databases required.",
        company: "Tech Corp",
        location: "San Francisco, CA",
        salary: 85000,
        requirements: ["Node.js", "MongoDB", "Express.js", "API Design"],
        employerId: employers[0]._id,
        status: "active",
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        title: "Full Stack Developer",
        description: "Looking for a versatile full stack developer who can work on both frontend and backend technologies.",
        company: "Startup Inc",
        location: "Remote",
        salary: 70000,
        requirements: ["JavaScript", "React", "Node.js", "PostgreSQL"],
        employerId: employers[1]._id,
        status: "active",
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        title: "Python Developer",
        description: "We need an experienced Python developer to work on our data processing and web applications.",
        company: "Startup Inc",
        location: "Austin, TX",
        salary: 80000,
        requirements: ["Python", "Django", "PostgreSQL", "REST APIs"],
        employerId: employers[1]._id,
        status: "active",
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        title: "Senior Software Engineer",
        description: "Lead our engineering team and mentor junior developers while working on challenging technical problems.",
        company: "Tech Corp",
        location: "Seattle, WA",
        salary: 120000,
        requirements: ["Leadership", "System Design", "Microservices", "Cloud Platforms"],
        employerId: employers[0]._id,
        status: "active",
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        title: "DevOps Engineer",
        description: "Manage our cloud infrastructure and CI/CD pipelines. Experience with AWS and Docker required.",
        company: "Startup Inc",
        location: "Denver, CO",
        salary: 95000,
        requirements: ["AWS", "Docker", "Kubernetes", "CI/CD"],
        employerId: employers[1]._id,
        status: "active",
        applicants: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const jobResult = await db.collection('jobs').insertMany(jobs);
    console.log(`Inserted ${Object.keys(jobResult.insertedIds).length} jobs`);

    // Sample Applications
    const applications = [
      {
        _id: new ObjectId(),
        jobId: jobs[0]._id, // Frontend Developer at Tech Corp
        applicantId: jobseekers[0]._id, // John Doe
        coverLetter: "I am excited to apply for the Frontend Developer position. With 3 years of experience in React and JavaScript, I believe I would be a great fit for your team.",
        resume: "https://example.com/john-doe-resume.pdf",
        status: "pending",
        appliedAt: new Date()
      },
      {
        _id: new ObjectId(),
        jobId: jobs[1]._id, // Backend Developer at Tech Corp
        applicantId: jobseekers[0]._id, // John Doe
        coverLetter: "I am interested in the Backend Developer role. My experience with Node.js and MongoDB makes me well-suited for this position.",
        resume: "https://example.com/john-doe-resume.pdf",
        status: "pending",
        appliedAt: new Date()
      },
      {
        _id: new ObjectId(),
        jobId: jobs[2]._id, // Full Stack Developer at Startup Inc
        applicantId: jobseekers[0]._id, // John Doe
        coverLetter: "The Full Stack Developer position aligns perfectly with my skills in both frontend and backend development.",
        resume: "https://example.com/john-doe-resume.pdf",
        status: "accepted",
        appliedAt: new Date()
      },
      {
        _id: new ObjectId(),
        jobId: jobs[3]._id, // Python Developer at Startup Inc
        applicantId: jobseekers[1]._id, // Jane Smith
        coverLetter: "With 5 years of Python and Django experience, I am confident I can contribute significantly to your team.",
        resume: "https://example.com/jane-smith-resume.pdf",
        status: "pending",
        appliedAt: new Date()
      },
      {
        _id: new ObjectId(),
        jobId: jobs[0]._id, // Frontend Developer at Tech Corp
        applicantId: jobseekers[2]._id, // Mike Johnson
        coverLetter: "Although my primary experience is in Java, I have been learning React and would love to transition to frontend development.",
        resume: "https://example.com/mike-johnson-resume.pdf",
        status: "rejected",
        appliedAt: new Date()
      },
      {
        _id: new ObjectId(),
        jobId: jobs[4]._id, // Senior Software Engineer at Tech Corp
        applicantId: jobseekers[1]._id, // Jane Smith
        coverLetter: "I am interested in taking on a leadership role and believe my experience makes me suitable for the Senior Software Engineer position.",
        resume: "https://example.com/jane-smith-resume.pdf",
        status: "pending",
        appliedAt: new Date()
      }
    ];

    const applicationResult = await db.collection('applications').insertMany(applications);
    console.log(`Inserted ${Object.keys(applicationResult.insertedIds).length} applications`);

    // Update jobs with applicant information
    for (const application of applications) {
      await db.collection('jobs').updateOne(
        { _id: application.jobId },
        { $addToSet: { applicants: application.applicantId } }
      );
    }

    console.log('Updated jobs with applicant information');

    console.log('\n=== Sample Data Summary ===');
    console.log('Users created:');
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.userType}`);
    });

    console.log('\nJobs created:');
    jobs.forEach(job => {
      console.log(`- ${job.title} at ${job.company} - $${job.salary.toLocaleString()}`);
    });

    console.log('\nApplications created:');
    for (const application of applications) {
      const applicant = users.find(u => u._id.equals(application.applicantId));
      const job = jobs.find(j => j._id.equals(application.jobId));
      console.log(`- ${applicant.name} applied for ${job.title} at ${job.company} - Status: ${application.status}`);
    }

    console.log('\n=== Login Credentials ===');
    console.log('Employers:');
    console.log('- hr@techcorp.com / password123 (Tech Corp)');
    console.log('- hr@startup.com / password123 (Startup Inc)');
    console.log('\nJob Seekers:');
    console.log('- john@example.com / password123 (John Doe)');
    console.log('- jane@example.com / password123 (Jane Smith)');
    console.log('- mike@example.com / password123 (Mike Johnson)');

  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

// Run the seeding
if (require.main === module) {
  seedData().then(() => {
    console.log('Seeding completed!');
    process.exit(0);
  }).catch(error => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });
}

module.exports = seedData;
