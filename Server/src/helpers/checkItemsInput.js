const checkItemsInput = (req, res, next) => {
  // New item Details
  const {
    meal,
    price,
  } = req.body;

  if (meal === '' || meal === null || meal === undefined) {
    // Meal field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'meal cannot be empty',
      },
    });
  } else if (!(Number.isInteger(+price)) || price === '' || price === null || price === undefined) {
    // Price field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'price must be an integer',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export checkItemsInput
export default checkItemsInput;
