// Import database
import db from '../db/index';

// Get all orders
class allOrders {
  static ordersList(req, res) {
    db.query('SELECT * FROM orders', (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while retrieving all orders, please try again',
          },
        });
      }

      if (result.rowCount === 0) {
        // Orders not found
        return res.status(404).json({
          status: 'fail',
          data: {
            message: 'No orders found, thank you.',
            orders: {},
          },
        });
      }

      // All orders found
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'All orders returned, thank you.',
          orders: result.rows,
        },
      });
    });
  }
}

// Export allOrders
export default allOrders;
