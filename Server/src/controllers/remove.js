// Import database
import db from '../db/index';

// Delete items
class remove {
  static items(req, res) {
    // Item id
    const {
      itemId,
    } = req.params;

    const query = {
      text: 'DELETE FROM menu WHERE id = $1',
      values: [`${itemId}`],
    };

    db.query(query, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to delete the item, from the men please try again.',
          },
        });
      }

      // Item deleted
      return res.status(200).json({
        status: 'success',
        data: {
          message: `Item with id => ${itemId}, deleted successfully.`,
        },
      });
    });
  }
}

// Export remove
export default remove;
