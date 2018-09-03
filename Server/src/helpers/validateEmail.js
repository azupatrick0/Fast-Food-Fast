const validateEmail = (req,res,next) => {

    // New Order Details
    const {  
        email,  
    } = req.body;

    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))) {
        // Invalid email
        return res.status(400).json({
            success: false,
            error: 'Invalid email address'           
        });
    } else {
        // Call the next middleware
        next();
    }
};

// Export validateEmail
export default validateEmail;