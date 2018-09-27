import ordersArray from '../dummydata/orders';
import usersArray from '../dummydata/users';

// Available rides
class newOrder {
  static placeOrder(req, res) {
    // New Order Details
    const {
      name,
      email,
      meal,
      quantity,
      price,
      location,
    } = req.body;

    // Default Order Details
    const id = ordersArray.length + 1;
    const created = new Date().toDateString();
    const status = 'pending';

    // All users email address
    const emailArray = [];

    // Loop through usersArray, then push in each user email
    usersArray.forEach((obj) => {
      emailArray.push(obj.email);
    });

    // User email in emailArray, make order
    if (emailArray.includes(email)) {
      // Insert new order into ordersArray
      const newestOrder = {
        id,
        name,
        email,
        meal,
        quantity,
        price,
        location,
        created,
        status,
      };

      // Push in new order to orders array
      ordersArray.push(newestOrder);

      // Log updated orders array to the console
      console.log(ordersArray);

      // Order made
      return res.status(201).json({
        success: true,
        data: {
          message: 'Your order has been processed, thank you.',
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
