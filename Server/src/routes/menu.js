import express from 'express';
import { isLoggedIn, checkFoodInput, isAdmin, itemsInDatabase, checkItemsInput } from '../helpers/index';
import { menu } from '../controllers/index';

const router = express.Router();

router.post('/', isLoggedIn, isAdmin, checkFoodInput, menu.addFoodItem);
router.get('/', isLoggedIn, menu.getFoodItems);
router.put('/:itemId', isLoggedIn, isAdmin, itemsInDatabase, checkItemsInput, menu.editFoodItems);
router.delete('/items/:itemId', isLoggedIn, isAdmin, itemsInDatabase, menu.removeFoodItems);

export default router;
