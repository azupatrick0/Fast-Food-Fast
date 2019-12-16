import db from '../db';

class menu {
  static addFoodItem(req, res) {
    // New item Details
    const {
      meal,
      price,
      imgurl,
    } = req.body;

    const query = {
      text: 'INSERT INTO menu(meal,price,imgurl) VALUES($1,$2,$3)',
      values: [`${meal}`, `${price}`, `${imgurl}`],
    };

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to add new food item to menu, please try again.',
          },
        });
      }

      // New food item added to menu
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'New food item added to menu successfully.',
          newFoodItem: result.rows[0],
        },
      });
    });
  }

  static editFoodItems(req, res) {
    const {
      itemId,
    } = req.params;

    // Item details
    const {
      meal,
      price,
      imgurl,
    } = req.body;

    const query = {
      text: 'UPDATE menu SET meal = $1, price = $2, imgurl = $3 WHERE id = $4',
      values: [`${meal}`, `${price}`, `${imgurl}`, `${itemId}`],
    };

    db.query(query, (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to update the item, please try again.',
          },
        });
      }

      // Item updated
      return res.status(200).json({
        status: 'success',
        data: {
          message: `Item with id => ${itemId}, updated successfully.`,
        },
      });
    });
  }

  static removeFoodItems(req, res) {
    const {
      itemId,
    } = req.params;

    const query = {
      text: 'DELETE FROM menu WHERE id = $1',
      values: [`${itemId}`],
    };

    db.query(query, (err) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          error: {
            message: 'An error occured while trying to delete the item, from the menu please try again.',
          },
        });
      }

      // Item deleted
      return res.status(200).json({
        status: 'success',
        data: {
          message: `Item with id => ${itemId}, deleted successfully.`,
        },
      });
    });
  }

  static getFoodItems(req, res) {
    db.query('SELECT * FROM menu ORDER BY id ASC', (err, result) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          data: {
            message: 'An error occured while retrieving available menu, please try again',
          },
        });
      }

      if (result.rowCount === 0) {
        // Items not found
        return res.status(404).json({
          status: 'fail',
          data: {
            message: 'No food items found in the menu, thank you.',
            items: {},
          },
        });
      }

      // All items found
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'Available menu returned successfully.',
          items: result.rows,
        },
      });
    });
  }
}

export default menu;
