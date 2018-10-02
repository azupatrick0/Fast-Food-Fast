// Import modules
import express from 'express';
import {
  checkSignUpInput, validateEmail, userInDatabase,
  checkSignInInput, isLoggedIn, checkInput, oneItemInDatabase,
  checkFoodInput, isAdmin, orderInDatabase, checkStatusInput,
} from '../helpers/index';
import { signUp, signIn, newOrder, add, allOrders, updateStatus, specificOrder, retrieve } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /auth/signup route, validateEmail, userInDatabase,
hand control over to the signUp controller */
router.post('/auth/signup', checkSignUpInput, validateEmail, userInDatabase, signUp.register);

/* If the user makes a POST request to the /auth/login route, checkSignIninput,
validateEmail, hand control over to the signIn controller */
router.post('/auth/login', checkSignInInput, validateEmail, signIn.login);

/* If the user makes a POST request to the /menu route, isLoggedIn, isAdmin,
checkFoodInput, hand control over to the add controller */
router.post('/menu', isLoggedIn, isAdmin, checkFoodInput, add.food);

/* If the user makes a POST request to the /orders route, checkInput, validateEmail,
oneItemInDatabase, hand control over to the newOrder controller */
router.post('/orders', isLoggedIn, checkInput, oneItemInDatabase, newOrder.placeOrder);

/* If the user makes a GET request to the /orders route, isLoggeIn, isAdmin, hand control over
to the allOrders controller */
router.get('/orders', isLoggedIn, isAdmin, allOrders.ordersList);

/* If the user makes a PUT request to the /orders/<orderId> route, isLoggeIn, isAdmin,
checkStatusInput, hand control over over to the updateStatus controller */
router.put('/orders/:orderId', isLoggedIn, isAdmin, orderInDatabase, checkStatusInput, updateStatus.orderStatus);

/* If the user makes a GET request to the /orders/<orderId> route, isLoggeIn, isAdmin,
hand control over to the specificOrder controller */
router.get('/orders/:orderId', isLoggedIn, isAdmin, specificOrder.oneOrder);

/* If the user makes a GET request to the /menu route, isLoggeIn, hand control over
to the retrieve controller */
router.get('/menu', isLoggedIn, retrieve.menu);

// Export router
export default router;
