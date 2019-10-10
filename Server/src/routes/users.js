import express from 'express';
import { checkSignUpInput, validateEmail, userInDatabase, checkSignInInput } from '../helpers/index';
import { users } from '../controllers/index';

const router = express.Router();

router.post('/signup', checkSignUpInput, validateEmail, userInDatabase, users.signup);
router.post('/login', checkSignInInput, validateEmail, users.login);

export default router;
