// routes/counsellingRoutes.ts
import express from 'express';
import * as counsellingController from '../controllers/counselling';

const router = express.Router();

router.post('/', counsellingController.createCounselling);
router.get('/', counsellingController.getAllCounsellings);
router.get('/:counsellingId', counsellingController.getCounsellingById);
router.put('/:counsellingId', counsellingController.updateCounsellingById);
router.delete('/:counsellingId', counsellingController.deleteCounsellingById);

export default router;
