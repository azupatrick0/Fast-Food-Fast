import db from '../db/index';

const itemsInDatabase = (req, res, next) => {
  const {
    itemId,
  } = req.params;

  const query = {
    text: 'SELECT * from menu WHERE id = $1',
    values: [`${itemId}`],
  };

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 'fail',
        error: {
          message: 'An error occured while trying to process the item, please try again.',
        },
      });
    }

    if (result.rowCount < 1) {
      // No such item
      return res.status(404).json({
        status: 'fail',
        data: {
          message: `Sorry, item with id => ${itemId}, not found`,
        },
      });
    }
    return next();
  });
};

export default itemsInDatabase;
