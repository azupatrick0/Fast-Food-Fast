const checkInput = (req, res, next) => {
  // New Order Details
  const {
    email,
    meal,
    quantity,
    location,
  } = req.body;

  if (email === '' || email === null || email === undefined) {
    // email field empty
    return res.status(400).json({
      success: false,
      error: 'email cannot be empty',
    });
  } else if (meal === '' || meal === null || meal === undefined) {
    // Email field empty
    return res.status(400).json({
      success: false,
      error: 'meal cannot be empty',
    });
  } else if (quantity === '' || quantity === null || quantity === undefined) {
    // Quantity field empty
    return res.status(400).json({
      success: false,
      error: 'quantity cannot be empty',
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
