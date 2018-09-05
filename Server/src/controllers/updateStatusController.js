// Import ordersArray
import ordersArray from '../dummydata/orders';

// Update the status of an order
class updateStatus {

    static orderStatus(req, res) {

        // Request id
        const requestId = req.params.orderId;

        // Status
        const statusToUpdateTo = req.body.status;

        // Order id (based on array starting from zero)
        const orderId = requestId - 1;
 
        // Order id's array
        let idArray = [];

        // Loop through ordersArray, then push in each id
        ordersArray.forEach(obj => {
            idArray.push(obj.id);
        });

        // Request id in ordersArray, therefore order in ordersArray, proceed to update status
        if (idArray.includes(orderId + 1)) {

            // Update status of order
            ordersArray[orderId].status = statusToUpdateTo;

            // Specific order found
            return res.status(200).json({
                status: 'success',
                data: {
                    message: `Status of order with id => ${requestId}, updated successfully.`,
                    order: ordersArray,
                }
            });
        }

        // Request id not in ordersArray, therefore order not in ordersArray, no status update
        return res.status(404).json({
            status: 'fail',
            data: {
                message: `Sorry, order with id => ${requestId}, not found`,
            }
        });

    }

}

// Export updateStatus
export default updateStatus;