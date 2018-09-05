// Import modules
import express from 'express';
import  checkInput from '../helpers/checkInput';
import  validateEmail from '../helpers/validateEmail';
import  { newOrder, allOrders, specificOrder } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /orders route, checkInput, validateEmaill, hand control over
to the newOrder controller */
router.post('/orders', checkInput, validateEmail, newOrder.placeOrder);

/* If the user makes a GET request to the /orders route, hand control over
to the allOrders controller */
router.get('/orders', allOrders.ordersList);

/* If the user makes a GET request to the /orders/<orderId> route, hand control over
to the specificOrder controller */
router.get('/orders/:orderId', specificOrder.oneOrder);

// Export router
export default router;
