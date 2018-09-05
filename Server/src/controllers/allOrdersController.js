// Import ordersArray
import ordersArray from '../dummydata/orders';

// Get all orders
class allOrders {

    static ordersList(req, res) {

        // All orders found
        return res.status(200).json({
            status: 'success',
            data: {
                message: 'All orders returned, thank you.',
                orders: ordersArray,
            }
        });

    }

}

// Export allOrders
export default allOrders;