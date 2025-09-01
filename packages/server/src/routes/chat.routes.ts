import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller.js';

const router = Router();
const chatController = new ChatController();

// Bind methods to preserve 'this' context
router.post('/api/chat', chatController.handleChat.bind(chatController));

export default router;
