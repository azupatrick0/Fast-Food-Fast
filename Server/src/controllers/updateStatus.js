// Import database
import db from '../db/index';

// Update the status of an order
class updateStatus {
  static orderStatus(req, res) {
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
        console.log(err);
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

// Export updateStatus
export default updateStatus;
