const checkSignUpInput = (req, res, next) => {
  // User details
  const {
    name,
    email,
    password,
    role,
  } = req.body;

  if (name === '' || name === null || name === undefined || name < 3) {
    // Name field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'name cannot be less than 3 characters',
      },
    });
  } else if (email === '' || email === null || email === undefined) {
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
  } else if (role === '' || role === null || role === undefined) {
    // Location field empty
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'role cannot be undefined',
      },
    });
  } else if (role !== 'user' && role !== 'admin') {
    // user type invalid
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'role can only be {admin or user}',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export checkSignUpInput
export default checkSignUpInput;
