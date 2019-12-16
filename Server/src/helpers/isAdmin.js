// Checks if user is an admin
const isAdmin = (req, res, next) => {
  const { role } = req.query;

  // User not an admin
  if (role !== 'admin') {
    return res.status(403).json({
      status: 'fail',
      data: {
        message: 'Sorry, only an admin can access this endpoint',
      },
    });
  }
  return next();
};

export default isAdmin;
