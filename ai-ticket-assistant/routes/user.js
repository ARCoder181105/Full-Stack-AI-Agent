import express from 'express'
import { getUser, login, logout, signup, updateUser } from '../controllers/user.js'
import { authenticate } from '../middlewares/auth.js'

const router = express.Router();//best for writing the route in the different files and also for the mainteing large number of routes

router.post('/update-user', authenticate, updateUser);
router.post('/users', authenticate, getUser);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);





export default router;