const checkInput = (req, res, next) => {
  // New Order Details
  const {
    menuid,
    userid,
    name,
    quantity,
    amount,
    location,
  } = req.body;

  if (menuid === '' || menuid === null || menuid === undefined) {
    // menu id field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'menu id cannot be empty',
      },
    });
  } else if (userid === '' || userid === null || userid === undefined) {
    // user id  field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'user id cannot be empty',
      },
    });
  } else if (name === '' || name === null || name === undefined) {
    // Name field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'name cannot be empty',
      },
    });
  } else if (quantity === '' || quantity === null || quantity === undefined) {
    // Quantity field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'quantity cannot be empty',
      },
    });
  } else if (!(Number.isInteger(+amount)) || amount === '' || amount === null || amount === undefined) {
    // Amount field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'amount must be an integer',
      },
    });
  } else if (location === '' || location === null || location === undefined) {
    // Location field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'location cannot be empty',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export checkInput
export default checkInput;
