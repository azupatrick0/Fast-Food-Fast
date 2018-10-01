// Postgres Module
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Database connection string
let connectionString;

// Get environment
if (process.env.NODE_ENV === 'test') {
  // Test Database connection string
  connectionString = process.env.DATABASE_TEST;
} else if (process.env.NODE_ENV === 'development') {
  // Development Database connection string
  connectionString = process.env.DATABASE_DEVELOPMENT;
} else {
  // Production Database connection string
  connectionString = process.env.DATABASE_PRODUCTION;
}

const db = new Pool({
  connectionString,
});

export default db;
