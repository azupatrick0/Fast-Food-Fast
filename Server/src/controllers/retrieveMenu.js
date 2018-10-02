// Import database
import db from '../db/index';

// Get all fast food items
class retrieve {
  static menu(req, res) {
    db.query('SELECT * FROM menu', (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while retrieving available menu, please try again',
          },
        });
      }

      if (result.rowCount === 0) {
        // Items not found
        return res.status(404).json({
          status: 'fail',
          data: {
            message: 'No food items found in the menu, thank you.',
            items: {},
          },
        });
      }

      // All items found
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Available menu returned successfully.',
          items: result.rows,
        },
      });
    });
  }
}

// Export retrieve
export default retrieve;
