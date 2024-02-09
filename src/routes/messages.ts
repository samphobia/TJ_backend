// routes/messageRoutes.ts
import express from 'express';
import * as messageController from '../controllers/messages';

const router = express.Router();

router.post('/', messageController.createMessage);

router.get('/', messageController.getAllMessages);

router.get('//:messageId', messageController.getMessageById);

router.put('/:messageId', messageController.updateMessageById);

router.delete('/:messageId', messageController.deleteMessageById);

export default router;
