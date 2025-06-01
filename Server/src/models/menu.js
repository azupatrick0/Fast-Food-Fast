import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS menu(id SERIAL NOT NULL PRIMARY KEY,meal VARCHAR(255) NOT NULL,
price INT NOT NULL, imgUrl TEXT NOT NULL, createdat TIMESTAMPTZ DEFAULT NOW(), updatedat TIMESTAMPTZ DEFAULT NOW())`;

if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS menu CASCADE; 
  CREATE TABLE IF NOT EXISTS menu(id SERIAL NOT NULL PRIMARY KEY,meal VARCHAR(255) NOT NULL,
  price INT NOT NULL, imgUrl TEXT NOT NULL, createdat TIMESTAMPTZ DEFAULT NOW(), updatedat TIMESTAMPTZ DEFAULT NOW())`;
}

// Create menu table in the database
db.query(sqlQuery, (err, result) => {
  if (err) {
    console.error('Error creating menu table:', err.message);
    return;
  }
  // Menu table created
  console.log('Connection successful, menu table created');

  return true;
});
