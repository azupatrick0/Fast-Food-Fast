import db from '../db/index';

const userInDatabase = (req, res, next) => {
  const {
    email,
  } = req.body;

  const query = {
    text: 'SELECT * from users WHERE email = $1',
    values: [`${email}`],
  };
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        data: {
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
    return next();
  });
};

export default userInDatabase;
