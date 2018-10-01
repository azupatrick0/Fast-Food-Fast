import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS users(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, user_type VARCHAR(255) NOT NULL,
created_at TIMESTAMPTZ DEFAULT NOW())`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS users CASCADE;
  CREATE TABLE IF NOT EXISTS users(id SERIAL NOT NULL PRIMARY KEY, name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, user_type VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW())`;
}

// Create users table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).json({
      status: 'fail',
      error: {
        message: 'An error occured while trying to create the users table, please try again',
      },
    });
  }
  // Users table created
  console.log('Connection successful, users table created');
  return true;
});
