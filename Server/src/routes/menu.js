// Import modules
import express from 'express';
import { isLoggedIn, checkFoodInput, isAdmin, itemsInDatabase, checkItemsInput } from '../helpers/index';
import { menu } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a POST request to the /menu route, isLoggedIn, isAdmin,
checkFoodInput, hand control over to the add controller */
router.post('/', isLoggedIn, isAdmin, checkFoodInput, menu.addFoodItem);

/* If the user makes a GET request to the /menu route, isLoggeIn, hand control over
to the retrieve controller */
router.get('/', isLoggedIn, menu.getFoodItems);

/* If the user makes a PUT request to the /menu/<itemId> route, isLoggedIn,
isAdmin, checkItemsInput, itemsInDatabase hand control to over the edit controller */
router.put('/:itemId', isLoggedIn, isAdmin, itemsInDatabase, checkItemsInput, menu.editFoodItems);

/* If the user makes a DELETE request to the /menu/items/<itemId> route, isLoggedIn, isAdmin,
itemsInDatabase hand control over to the remove controller */
router.delete('/items/:itemId', isLoggedIn, isAdmin, itemsInDatabase, menu.removeFoodItems);

// Export router
export default router;
