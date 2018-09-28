// Import ordersArray
import ordersArray from '../dummydata/orders';

// Get a users orders
class ordersHistory {
  static history(req, res) {
    // Users email
    const {
      email,
    } = req.query;

    // Orders array
    const orders = [];

    // Loop through ordersArray, then find orders with the users email
    ordersArray.forEach((obj) => {
      if (obj.email === email) {
        orders.push(obj);
      }
    });

    // Orders found
    if (orders.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Orders found',
          orders,
        },
      });
    }

    // No orders
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Sorry, orders not found',
      },
    });
  }
}

// Export orderHistory
export default ordersHistory;
