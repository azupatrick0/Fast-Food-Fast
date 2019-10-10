import express from 'express';
import { notFoundPage } from '../controllers/index';

const router = express.Router();

router.get('/', notFoundPage.notFound);

export default router;
