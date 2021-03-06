import db from '../db/index';

const orderInDatabase = (req, res, next) => {
  const {
    orderId,
  } = req.params;

  const query = {
    text: 'SELECT * from orders WHERE id = $1',
    values: [`${orderId}`],
  };

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        error: {
          message: 'An error occured while trying to update the order, please try again.',
        },
      });
    }

    if (result.rowCount < 1) {
      // No such order
      return res.status(404).json({
        status: 'fail',
        data: {
          message: `Sorry, order with id => ${orderId}, not found`,
        },
      });
    }
    return next();
  });
};

export default orderInDatabase;
