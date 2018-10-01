// Import module
import db from '../db/index';

const userInDatabase = (req, res, next) => {
  // User email
  const {
    email,
  } = req.body;

  const query = {
    text: 'SELECT * from users WHERE email = $1',
    values: [`${email}`],
  };
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 'fail',
        error: {
          message: 'An error occured while trying to sign you up, please try again.',
        },
      });
    }

    // Email already in use
    if (result.rowCount > 0) {
      return res.status(409).json({
        status: 'fail',
        data: {
          message: `email => ${email} already in use, please choose another.`,
        },
      });
    }
    // Call the next middleware
    return next();
  });
};

// Export userInDatabase
export default userInDatabase;
