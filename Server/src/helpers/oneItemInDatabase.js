// Import module
import db from '../db/index';

const oneItemInDatabase = (req, res, next) => {
  db.query('SELECT * from menu', (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 'fail',
        error: {
          message: 'An error occured while trying to retrieve food menu, please try again.',
        },
      });
    }

    if (result.rowCount < 1) {
      // No food item found in menu
      return res.status(404).json({
        status: 'fail',
        data: {
          message: 'Sorry, no food item found in menu',
        },
      });
    }
    // Call the next middleware
    return next();
  });
};

// Export oneItemInDatabase
export default oneItemInDatabase;
