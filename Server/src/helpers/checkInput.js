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

  if (!menuid) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'menu id cannot be empty',
      },
    });
  } else if (!userid) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'user id cannot be empty',
      },
    });
  } else if (!name) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'name cannot be empty',
      },
    });
  } else if (!quantity) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'quantity cannot be empty',
      },
    });
  } else if (!(Number.isInteger(+amount)) || !amount) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'amount must be an integer',
      },
    });
  } else if (!location) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'location cannot be empty',
      },
    });
  }
  return next();
};

export default checkInput;
