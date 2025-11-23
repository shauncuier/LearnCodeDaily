import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'bloodbank_v2.db');
const db = new Database(dbPath);

// Initialize database with tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    bio TEXT,
    profilePicture TEXT,
    dateOfBirth TEXT,
    address TEXT,
    availability TEXT DEFAULT 'available',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS donors (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    bloodGroup TEXT NOT NULL,
    district TEXT NOT NULL,
    upazila TEXT NOT NULL,
    village TEXT,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    lastDonation TEXT,
    availability TEXT DEFAULT 'available',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS volunteers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    district TEXT NOT NULL,
    upazila TEXT NOT NULL,
    status TEXT DEFAULT 'active',
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS blood_requests (
    id TEXT PRIMARY KEY,
    patientName TEXT NOT NULL,
    bloodGroup TEXT NOT NULL,
    units INTEGER NOT NULL,
    urgency TEXT DEFAULT 'normal',
    hospital TEXT NOT NULL,
    district TEXT NOT NULL,
    upazila TEXT NOT NULL,
    contactPhone TEXT NOT NULL,
    contactEmail TEXT NOT NULL,
    requestedBy TEXT,
    status TEXT DEFAULT 'pending',
    notes TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    fulfilledAt TEXT,
    FOREIGN KEY (requestedBy) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS donation_history (
    id TEXT PRIMARY KEY,
    donorId TEXT NOT NULL,
    donationDate TEXT NOT NULL,
    location TEXT NOT NULL,
    bloodGroup TEXT NOT NULL,
    units INTEGER DEFAULT 1,
    recipient TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (donorId) REFERENCES donors(id)
  );

  CREATE TABLE IF NOT EXISTS badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    criteria TEXT NOT NULL,
    icon TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_badges (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    badgeId TEXT NOT NULL,
    earnedAt TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (badgeId) REFERENCES badges(id)
  );
`);

export default db;
