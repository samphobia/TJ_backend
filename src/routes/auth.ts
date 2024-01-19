import express from 'express';
import * as authController from '../controllers/auth';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/getlogged', authController.getLoggedUser);

export default router;