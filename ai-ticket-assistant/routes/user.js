import express from 'express'
import { getUser, login, logout, signup, updateUser } from '../controllers/user.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router();

// Protected routes
router.post('/update-user', authenticate, updateUser);
router.get('/profile', authenticate, getUser);

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;