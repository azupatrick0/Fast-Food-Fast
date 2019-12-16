const checkStatusInput = (req, res, next) => {
  // New Order Details
  const {
    status,
  } = req.body;

  if (!status) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'status cannot be empty',
      },
    });
  } else if ((status !== 'complete') && (status !== 'new') && (status !== 'processing') && (status !== 'cancelled')) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'status must be either complete, new, processing, or cancelled',
      },
    });
  }
  return next();
};

export default checkStatusInput;
