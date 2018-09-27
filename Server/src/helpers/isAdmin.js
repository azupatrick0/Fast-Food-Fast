// Checks if user is an admin
const isAdmin = (req, res, next) => {
  // Get user type
  const {
    userType,
  } = req.query;

  // User not an admin
  if (!(userType === 'admin')) {
    return res.status(403).json({
      status: 'fail',
      data: {
        message: 'Sorry, only an admin can access this endpoint',
      },
    });
  }
  // Call the next middleware
  return next();
};

// Export isAdmin
export default isAdmin;
