// Import ordersArray
import ordersArray from '../dummydata/orders';

// Get specific order
class specificOrder {

    static oneOrder(req, res) {

        // Request id
        const requestId = req.params.orderId;

        // Order id (based on array starting from zero)
        const orderId = requestId - 1;
 
        // Order id's array
        let idArray = [];

        // Loop through ordersArray, then push in each id
        ordersArray.forEach(obj => {
            idArray.push(obj.id);
        });

        // Request id in ordersArray
        if (idArray.includes(orderId + 1)) {

            // Specific order found
            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'specific order returned, thank you.',
                    order: ordersArray[orderId],
                }
            });
        }

        // Request id not in ordersArray
        return res.status(404).json({
            status: 'fail',
            data: {
                message: `Sorry, order with id => ${requestId}, not found`,
            }
        });

    }

}

// Export specificOrder
export default specificOrder;