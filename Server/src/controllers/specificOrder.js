// Import database
import db from '../db/index';

// Get specific order
class specificOrder {
  static oneOrder(req, res) {
    // Request id
    const requestId = req.params.orderId;

    const query = {
      text: 'SELECT * FROM orders WHERE id = $1',
      values: [`${requestId}`],
    };

    // Select specific order from the database
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to get the specific order, please try again.',
          },
        });
      }

      if (result.rowCount === 0) {
        // Order not found
        return res.status(404).json({
          status: 'fail',
          data: {
            message: `Sorry, order with id => ${requestId}, not found`,
          },
        });
      }

      // Specific order found
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'specific order returned, thank you.',
          order: result.rows,
        },
      });
    });
  }
}

// Export specificOrder
export default specificOrder;
