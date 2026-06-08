import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

// Mount the GET controller logic to our base products endpoint path
router.route('/').get(getProducts);

export default router;