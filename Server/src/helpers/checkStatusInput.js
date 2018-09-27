const checkStatusInput = (req, res, next) => {
  // New Order Details
  const {
    status,
  } = req.body;

  if (status === '' || status === null || status === undefined) {
    // status field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'status cannot be empty',
      },
    });
  } else if ((status !== 'completed') && (status !== 'accepted') && (status !== 'rejected')) {
    // status not valid
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'status must be either completed or accepted or rejected',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export checkStatusInput
export default checkStatusInput;
