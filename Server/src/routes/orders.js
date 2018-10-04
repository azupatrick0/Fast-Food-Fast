// Import modules
import express from 'express';
import { isLoggedIn, checkInput, oneItemInDatabase, isAdmin, orderInDatabase, checkStatusInput } from '../helpers/index';
import { orders } from '../controllers/index';

// Express router
const router = express.Router();


/* If the user makes a POST request to the /orders route, checkInput, validateEmail,
oneItemInDatabase, hand control over to the newOrder controller */
router.post('/', isLoggedIn, checkInput, oneItemInDatabase, orders.placeOrder);

/* If the user makes a GET request to the /orders route, isLoggeIn, isAdmin, hand control over
to the allOrders controller */
router.get('/', isLoggedIn, isAdmin, orders.getAllOrders);

/* If the user makes a PUT request to the /orders/<orderId> route, isLoggeIn, isAdmin,
checkStatusInput, hand control over over to the updateStatus controller */
router.put('/:orderId', isLoggedIn, isAdmin, orderInDatabase, checkStatusInput, orders.updateStatus);

/* If the user makes a GET request to the /orders/<orderId> route, isLoggeIn, isAdmin,
hand control over to the specificOrder controller */
router.get('/:orderId', isLoggedIn, isAdmin, orders.specificOrder);

/* If the user makes a GET request to the /users/<userId>/orders route, isLoggedIn,
hand control over to the history controller */
router.get('/:userId/orders', isLoggedIn, orders.history);

// Export router
export default router;
