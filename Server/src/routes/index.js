// Import modules
import express from 'express';
import  checkInput from '../helpers/checkInput';
import  validateEmail from '../helpers/validateEmail';
import  newOrder from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /orders route, checkInput, validateEmaill, hand control over
to the newOrder controller */
router.post('/orders', checkInput, validateEmail, newOrder.placeOrder);

// Export router
export default router;
