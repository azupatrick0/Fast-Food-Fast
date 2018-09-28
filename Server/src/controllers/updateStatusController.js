// Import ordersArray
import ordersArray from '../dummydata/orders';

// Update the status of an order
class updateStatus {
  static orderStatus(req, res) {
    // Request id
    let requestId = req.params.orderId;
    requestId = Number(requestId);

    // Status
    const statusToUpdateTo = req.body.status;

    // Find order
    const order = ordersArray.find(obj => obj.id === requestId);

    // Order found, proceed to update status
    if (order) {
      // Update status of order
      order.status = statusToUpdateTo;

      // Specific order found
      return res.status(200).json({
        status: 'success',
        data: {
          message: `Status of order with id => ${requestId}, updated successfully.`,
          order: ordersArray,
        },
      });
    }

    // Request id not in ordersArray, therefore order not in ordersArray, no status update
    return res.status(404).json({
      status: 'fail',
      data: {
        message: `Sorry, order with id => ${requestId}, not found`,
      },
    });
  }
}

// Export updateStatus
export default updateStatus;
