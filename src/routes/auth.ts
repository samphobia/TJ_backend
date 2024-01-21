import express from 'express';
import * as authController from '../controllers/auth';
import { authenticateJWT, authenticateUser } from '../middlewares/auth';

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/getlogged',authenticateUser(['admin']), authenticateJWT, authController.getLoggedUser);
router.post('/logout', authenticateJWT, authController.logout);

export default router;