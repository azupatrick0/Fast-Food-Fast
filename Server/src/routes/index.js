// Import modules
import express from 'express';
import checkSignUpInput from '../helpers/checkSignUpInput';
import validateEmail from '../helpers/validateEmail';
import userInDatabase from '../helpers/userInDatabase';
import checkSignInInput from '../helpers/checkSignInInput';
import { signUp, signIn } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /auth/signup route, validateEmail, userInDatabase,
hand control over to the signUp controller */
router.post('/auth/signup', checkSignUpInput, validateEmail, userInDatabase, signUp.register);

/* If the user makes a POST request to the /auth/login route, checkSignIninput,
validateEmail, hand control over to the signIn controller */
router.post('/auth/login', checkSignInInput, validateEmail, signIn.login);


// Export router
export default router;
