const checkSignInInput = (req, res, next) => {
  // User details
  const {
    email,
    password,
  } = req.body;

  if (!email) {
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
  }
  return next();
};

export default checkSignInInput;
