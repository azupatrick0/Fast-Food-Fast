// Import database
import db from '../db/index';

// Edit items
class edit {
  static items(req, res) {
    // Item id
    const {
      itemId,
    } = req.params;

    // Item details
    const {
      meal,
      price,
    } = req.body;

    const query = {
      text: 'UPDATE menu SET meal = $1, price = $2 WHERE id = $3',
      values: [`${meal}`, `${price}`, `${itemId}`],
    };

    db.query(query, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to update the item, please try again.',
          },
        });
      }

      // Item updated
      return res.status(200).json({
        status: 'success',
        data: {
          message: `Item with id => ${itemId}, updated successfully.`,
        },
      });
    });
  }
}

// Export edit
export default edit;
