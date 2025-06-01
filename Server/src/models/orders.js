import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS orders(id SERIAL NOT NULL PRIMARY KEY,
menuid INT NOT NULL, meal VARCHAR(255) NOT NULL, imgurl TEXT NOT NULL, userid INT NOT NULL, name VARCHAR(255) NOT NULL, 
quantity INT NOT NULL, amount INT NOT NULL,
location VARCHAR(255), status VARCHAR(255) DEFAULT 'new', createdat TIMESTAMPTZ DEFAULT NOW(),
createddate DATE NOT NULL DEFAULT CURRENT_DATE,
FOREIGN KEY(menuid) REFERENCES menu(id) ON DELETE CASCADE,
FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE)`;


if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS orders CASCADE;
  CREATE TABLE IF NOT EXISTS orders(id SERIAL NOT NULL PRIMARY KEY,
  menuid INT NOT NULL, meal VARCHAR(255) NOT NULL, imgurl TEXT NOT NULL, userid INT NOT NULL, name VARCHAR(255) NOT NULL, 
  quantity INT NOT NULL, amount INT NOT NULL,
  location VARCHAR(255), status VARCHAR(255) DEFAULT 'new', createdat TIMESTAMPTZ DEFAULT NOW(),
  createddate DATE NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY(menuid) REFERENCES menu(id) ON DELETE CASCADE,
  FOREIGN KEY(userid) REFERENCES users(id) ON DELETE CASCADE)`;
}

// Create orders table in the database
db.query(sqlQuery, (err, result) => {
  if (err) {
    console.error('Error creating menu table:', err.message);
    return;
  }
  // Menu table created
  console.log('Connection successful, orders table created');

  return true;
});
