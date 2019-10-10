const checkFoodInput = (req, res, next) => {
  // New food item Details
  const {
    meal,
    price,
  } = req.body;

  if (!meal) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'meal cannot be empty',
      },
    });
  } else if (!(Number.isInteger(+price)) || !price) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'price must be an integer',
      },
    });
  }
  return next();
};

export default checkFoodInput;
