import express from 'express';
import * as authController from '../controllers/donations';
import { authenticateJWT, authenticateUser } from '../middlewares/auth';

const router = express.Router();


router.post('/', authenticateJWT, authenticateUser(['admin', 'superadmin']), authController.createDonation);

router.get('/', authController.getAllDonations);

router.get('/:donationId', authController.getDonationById);

router.patch('/:donationId', authenticateJWT, authenticateUser(['admin', 'superadmin']), authController.updateDonationById);

router.delete('/:donationId', authenticateJWT, authenticateUser(['admin', 'superadmin']), authController.deleteDonationById);


export default router;