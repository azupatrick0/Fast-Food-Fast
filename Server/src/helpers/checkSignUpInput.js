const checkSignUpInput = (req, res, next) => {
  // User details
  const {
    name,
    email,
    password,
    role,
  } = req.body;

  if (!name || name < 3) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'name cannot be less than 3 characters',
      },
    });
  } else if (!email) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'email cannot be empty',
      },
    });
  } else if (!password || password < 6) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'password cannot be less than 6 characters',
      },
    });
  } else if (!role) {
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
  return next();
};

export default checkSignUpInput;
