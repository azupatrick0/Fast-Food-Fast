import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

let sqlQuery = `CREATE TABLE IF NOT EXISTS orders(id SERIAL NOT NULL PRIMARY KEY,
menu_id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, 
quantity INT NOT NULL, amount INT NOT NULL,
location VARCHAR(255), status VARCHAR(255) DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(),
FOREIGN KEY(menu_id) REFERENCES menu(id) ON DELETE CASCADE,
FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`;


if (process.env.NODE_ENV === 'test') {
  sqlQuery = `DROP TABLE IF EXISTS orders CASCADE;
  CREATE TABLE IF NOT EXISTS orders(id SERIAL NOT NULL PRIMARY KEY,
  menu_id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, 
  quantity INT NOT NULL, amount INT NOT NULL,
  location VARCHAR(255), status VARCHAR(255) DEFAULT 'pending', created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY(menu_id) REFERENCES menu(id) ON DELETE CASCADE,
  FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE)`;
}

// Create orders table in the database
db.query(sqlQuery, (err, res) => {
  if (err) {
    return res.status(500).json({
      status: 'fail',
      error: {
        message: 'An error occured while trying to create the orders table, please try again',
      },
    });
  }
  // Orders table created
  console.log('Connection successful, orders table created');
  return true;
});
