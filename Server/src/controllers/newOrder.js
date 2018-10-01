// Import database
import db from '../db/index';

// Place an order
class newOrder {
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

    db.query(query, (err) => {
      if (err) {
        console.log(err);
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
        },
      });
    });
  }
}

// Export newOrder
export default newOrder;
