const validateEmail = (req, res, next) => {
  // User email
  const {
    email,
  } = req.body;

  if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
    // Invalid email
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'Invalid email address',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export validateEmail
export default validateEmail;
