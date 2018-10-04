// Import modules
import express from 'express';
import { notFoundPage } from '../controllers/index';

// Express router
const router = express.Router();

/* If the user makes a request to the /api/v1/* route, hand control
to the notFound controller */
router.get('/', notFoundPage.notFound);

// Export router
export default router;
