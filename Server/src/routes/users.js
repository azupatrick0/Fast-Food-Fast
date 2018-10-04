// Import modules
import express from 'express';
import { checkSignUpInput, validateEmail, userInDatabase, checkSignInInput } from '../helpers/index';
import { users } from '../controllers/index';

// Express router
const router = express.Router();


/* If the user makes a POST request to the /auth/signup route, checkSignUpInput, validateEmail,
userInDatabase, hand control over to the signUp controller */
router.post('/signup', checkSignUpInput, validateEmail, userInDatabase, users.signup);

/* If the user makes a POST request to the /auth/login route, checkSignIninput,
validateEmail, hand control over to the signIn controller */
router.post('/login', checkSignInInput, validateEmail, users.login);

// Export router
export default router;
