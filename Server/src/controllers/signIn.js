// Import modules
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../db/index';

dotenv.config();

// Sign in a user
class signIn {
  static login(req, res) {
    // User details
    const {
      email,
      password,
    } = req.body;

    const query = {
      text: 'SELECT * FROM users WHERE email = $1',
      values: [`${email}`],
    };

    // Get user details
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to sign you in, please try again.',
          },
        });
      }

      // User not found
      if (result.rowCount === 0) {
        return res.status(404).json({
          status: 'fail',
          data: {
            message: 'Authentication failed. User not found',
          },
        });
      }

      const crypticPassword = result.rows[0].password;
      const validPassword = bcrypt.compareSync(password, crypticPassword);

      //  Password incorrect
      if (!validPassword) {
        return res.status(401).json({
          status: 'fail',
          data: {
            message: 'Authentication failed. Wrong password',
          },
        });
      }

      // If user is found and password is correct, create a token for the user
      const token = jwt.sign({ email: `${email}` }, process.env.SECRET_KEY, {
        expiresIn: 86400, // expires in 24 hours
      });

      const {
        name,
      } = result.rows[0];

      return res.status(200).json({
        status: 'success',
        data: {
          message: `Welcome, ${name}`,
          userDetails: result.rows[0],
          token,
        },
      });
    });
  }
}

// Export signIn
export default signIn;
