// Import ordersArray
import ordersArray from '../dummydata/orders';

// Get specific order
class specificOrder {
  static oneOrder(req, res) {
    // Request id
    let requestId = req.params.orderId;
    requestId = Number(requestId);

    // Find order
    const found = ordersArray.find(obj => obj.id === requestId);
    // Order found
    if (found) {
      // Specific order found
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'specific order returned, thank you.',
          order: found,
        },
      });
    }

    // Request id not in ordersArray
    return res.status(404).json({
      status: 'fail',
      data: {
        message: `Sorry, order with id => ${requestId}, not found`,
      },
    });
  }
}

// Export specificOrder
export default specificOrder;
