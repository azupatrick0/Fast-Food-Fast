// Import modules
import express from 'express';
import { homePage } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a GET request to the /api/v1/ route, hand control over to the
homePage controller */
router.get('/', homePage.home);

// Export router
export default router;
