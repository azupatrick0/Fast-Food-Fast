import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isLoggedIn = (req, res, next) => {
  // Check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  // Decode token
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    // If there is no token, forbid the user from accessing the routes
    if (token === '' || token === null || token === undefined) {
      return res.status(403).json({
        status: 'fail',
        data: {
          message: 'No token provided.',
        },
      });
    } else if (err) {
      // Wrong token
      return res.status(500).json({
        status: 'fail',
        data: {
          message: 'Failed to authenticate user token.',
        },
      });
    }
    // Call the next middleware
    return next();
  });
};

// Export isLoggedIn
export default isLoggedIn;
