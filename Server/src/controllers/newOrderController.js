import ordersArray from '../dummydata/orders';
import usersArray from '../dummydata/users';

// Available rides
class newOrder {
  static placeOrder(req, res) {
    // New Order Details
    const {
      email,
      items,
      location,
    } = req.body;

    // Default Order Details
    const id = ordersArray.length + 1;
    const created = new Date().toDateString();
    const status = 'pending';

    // Find user
    const found = usersArray.find(obj => obj.email === email);
    // User found, make an order
    if (found) {
      // Insert new order into ordersArray
      const newestOrder = {
        id,
        email,
        items,
        location,
        created,
        status,
      };

      // Push in new order to orders array
      ordersArray.push(newestOrder);
      return res.status(201).json({
        success: true,
        data: {
          message: 'Your order has been processed, thank you.',
          newestOrder,
        },
      });
    }

    // User email not in emailArray, dont make order
    return res.status(404).json({
      success: false,
      data: {
        message: 'Sorry, user not found, order not made',
      },
    });
  }
}

// Export newOrder
export default newOrder;
