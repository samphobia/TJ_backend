import express from 'express';
import * as authController from '../controllers/auth';
import { authenticateUser } from '../middlewares/auth';

const router = express.Router();

router.post('/register', authenticateUser(['admin']), authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/getlogged', authController.getLoggedUser);

export default router;