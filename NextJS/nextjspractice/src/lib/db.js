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
    role TEXT DEFAULT 'user', -- 'user', 'admin', 'volunteer'
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
`);

export default db;
