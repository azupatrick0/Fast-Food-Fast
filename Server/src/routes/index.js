// Import modules
import express from 'express';
import checkSignUpInput from '../helpers/checkSignUpInput';
import validateEmail from '../helpers/validateEmail';
import userInDatabase from '../helpers/userInDatabase';
import signUp from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /auth/signup route, validateEmail, userInDatabase,
hand control over to the signUp controller */
router.post('/auth/signup', checkSignUpInput, validateEmail, userInDatabase, signUp.register);

// Export router
export default router;
