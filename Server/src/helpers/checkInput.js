const checkInput = (req, res, next) => {
  // New Order Details
  const {
    email,
    items,
    location,
  } = req.body;

  if (email === '' || email === null || email === undefined) {
    // email field empty
    return res.status(400).json({
      success: false,
      error: 'email cannot be empty',
    });
  } else if (items === '' || items === null || items === undefined) {
    // Email field empty
    return res.status(400).json({
      success: false,
      error: 'items cannot be empty',
    });
  } else if (location === '' || location === null || location === undefined) {
    // Location field empty
    return res.status(400).json({
      success: false,
      error: 'location cannot be empty',
    });
  }
  // Call the next middleware
  return next();
};

// Export checkInput
export default checkInput;
