import express from 'express';
import { isLoggedIn, checkInput, oneItemInDatabase, isAdmin, orderInDatabase, checkStatusInput } from '../helpers/index';
import { orders } from '../controllers/index';

const router = express.Router();


router.post('/', isLoggedIn, checkInput, oneItemInDatabase, orders.placeOrder);

router.post('/checkout', orders.checkout);

router.get('/', isLoggedIn, isAdmin, orders.getAllOrders);

router.put('/:orderId', isLoggedIn, isAdmin, orderInDatabase, checkStatusInput, orders.updateStatus);

router.get('/:orderId', isLoggedIn, isAdmin, orders.specificOrder);

router.get('/:userId/orders', isLoggedIn, orders.history);

export default router;
