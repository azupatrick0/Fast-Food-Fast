// Import database
import db from '../db/index';

class orders {
  // Place an order
  static placeOrder(req, res) {
    // New Order Details
    const {
      menuid,
      userid,
      name,
      quantity,
      amount,
      location,
    } = req.body;

    const query = {
      text: 'INSERT INTO orders(menuid,userid,name,quantity,amount,location) VALUES($1,$2,$3,$4,$5,$6)',
      values: [`${menuid}`, `${userid}`, `${name}`, `${quantity}`, `${amount}`, `${location}`],
    };

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to process your order, please try again.',
          },
        });
      }

      // Order made
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'Your order has been processed, thank you.',
          orderDetails: result.rows[0],
        },
      });
    });
  }

  // Get all orders
  static getAllOrders(req, res) {
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

  // Get a user orders history
  static history(req, res) {
    const {
      userId,
    } = req.params;

    const query = {
      text: 'SELECT * FROM orders WHERE userid = $1',
      values: [`${userId}`],
    };

    db.query(query, (err, result) => {
      if (err) {
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

  // Get a specific order
  static specificOrder(req, res) {
    // Request id
    const requestId = req.params.orderId;

    const query = {
      text: 'SELECT * FROM orders WHERE id = $1',
      values: [`${requestId}`],
    };

    // Select specific order from the database
    db.query(query, (err, result) => {
      if (err) {
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

  // Update the status of an order
  static updateStatus(req, res) {
    // Request id
    const requestId = req.params.orderId;

    // Status
    const {
      status,
    } = req.body;

    const query = {
      text: 'UPDATE orders SET status = $1 WHERE id = $2',
      values: [`${status}`, `${requestId}`],
    };

    db.query(query, (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to update the order, please try again.',
          },
        });
      }

      // Status of order updated
      return res.status(200).json({
        status: 'success',
        data: {
          message: `Status of order with id => ${requestId}, updated successfully.`,
        },
      });
    });
  }
}

// Export orders
export default orders;
