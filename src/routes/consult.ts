import express from 'express';
import * as consultController from '../controllers/consult';
import { authenticateJWT, authenticateUser } from '../middlewares/auth';

const router = express.Router();


router.post('/', consultController.createConsultation);

router.get('/', consultController.getAllConsultations);

router.get('/:consultationId', consultController.getConsultationById);

router.patch('/:consultationId', authenticateJWT, authenticateUser(['admin', 'superadmin']), consultController.updateConsultationById);

router.delete('/:consultationId', authenticateJWT, authenticateUser(['admin', 'superadmin']), consultController.deleteConsultationById);


export default router;