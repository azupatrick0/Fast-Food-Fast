// Checks if user is an admin
const isAdmin = (req, res, next) => {

    // Get user type
    const user_type = req.query.user_type;

    // User not an admin
    if (!(user_type === 'admin')) {
        return res.status(403).json({
            status: 'fail',
            data: {
                message: 'Sorry, only an admin can access this endpoint',
            }
        })
    } else {
        // Call the next middleware
        next();
    }

};

// Export isAdmin
export default isAdmin;