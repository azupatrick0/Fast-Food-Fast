const checkSignInInput = (req, res, next) => {
  // User details
  const {
    email,
    password,
  } = req.body;

  if (email === '' || email === null || email === undefined) {
    // Quantity field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'email cannot be empty',
      },
    });
  } else if (password === '' || password === null || password === undefined || password < 6) {
    // Price field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'password cannot be less than 6 characters',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export checkSignInInput
export default checkSignInInput;
