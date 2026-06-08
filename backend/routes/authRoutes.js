import express from 'express';
import { authUser, registerUser } from '../controllers/authController.js';

const router = express.Router();

// Route map for registering a brand-new user account
router.route('/register').post(registerUser);

// Route map for logging in an existing user account
router.route('/login').post(authUser);

export default router;