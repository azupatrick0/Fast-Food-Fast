// Import database
import db from '../db/index';

// Get all history of ordered food
class history {
  static orders(req, res) {
    const {
      userId,
    } = req.params;

    const query = {
      text: 'SELECT * FROM orders WHERE userid = $1',
      values: [`${userId}`],
    };

    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while retrieving all your orders history, please try again',
          },
        });
      }

      if (result.rowCount === 0) {
        // Orders history not found
        return res.status(404).json({
          status: 'fail',
          data: {
            message: 'You have no history of ordered food, thank you.',
            history: {},
          },
        });
      }

      // History of ordered food found
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'All orders history returned, thank you.',
          history: result.rows,
        },
      });
    });
  }
}

// Export history
export default history;
