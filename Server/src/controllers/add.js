// Import database
import db from '../db';

// Add fast food items
class add {
  static food(req, res) {
    // New item Details
    const {
      meal,
      price,
    } = req.body;

    const query = {
      text: 'INSERT INTO menu(meal,price) VALUES($1,$2)',
      values: [`${meal}`, `${price}`],
    };

    db.query(query, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to add new food item to menu, please try again.',
          },
        });
      }

      // New food item added to menu
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'New food item added to menu successfully.',
        },
      });
    });
  }
}

// Export add
export default add;
