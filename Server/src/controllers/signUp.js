// Import modules
import bcrypt from 'bcrypt';
import db from '../db/index';

// Sign up a user
class signUp {
  static register(req, res) {
    // User details
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    // Encrypt password
    const saltRounds = 10;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds);

    const query = {
      text: 'INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4)',
      values: [`${name}`, `${email}`, `${encryptedPassword}`, `${role}`],
    };

    // Insert new user into the database
    return db.query(query, (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to sign you up, please try again.',
          },
        });
      }

      // New user created
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'New user created',
        },
      });
    });
  }
}

// Export signUp
export default signUp;
