import express from 'express';
import { homePage } from '../controllers/index';

const router = express.Router();

router.get('/', homePage.home);
router.get('/docs', homePage.docs);

export default router;
