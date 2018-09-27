// Import modules
import express from 'express';
import checkInput from '../helpers/checkInput';
import validateEmail from '../helpers/validateEmail';
import checkStatusInput from '../helpers/checkStatusInput';
import isAdmin from '../helpers/isAdmin';
import { newOrder, allOrders, specificOrder, updateStatus, homePage, notFoundPage } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /orders route, checkInput, validateEmaill,
hand control over to the newOrder controller */
router.post('/orders', checkInput, validateEmail, newOrder.placeOrder);

/* If the user makes a GET request to the /orders route, hand control over
to the allOrders controller */
router.get('/orders', isAdmin, allOrders.ordersList);

/* If the user makes a GET request to the /orders/<orderId> route, hand control over
to the specificOrder controller */
router.get('/orders/:orderId', isAdmin, specificOrder.oneOrder);

/* If the user makes a PUT request to the /orders/<orderId> route, hand control over
to the updateStatus controller */
router.put('/orders/:orderId', checkStatusInput, isAdmin, updateStatus.orderStatus);

/* If the user makes a request to the /api/v1/ route, hand control
to the homePage controller */
router.get('/', homePage.home);

/* If the user makes a request to the /api/v1/* route, hand control
to the notFound controller */
router.get('*', notFoundPage.notFound);

// Export router
export default router;
