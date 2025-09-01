import type { Request, Response } from 'express';
import { ChatService } from '../services/chat.service.js';
import { z } from 'zod';

const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required')
    .max(1000, 'Prompt is too long, max 1000 characters'),
  conversationId: z.string().uuid(),
});

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  async handleChat(req: Request, res: Response): Promise<void> {
    try {
      // Validate request body
      const parseResult = chatSchema.safeParse(req.body);
      console.log('parseResult:', parseResult);

      if (!parseResult.success) {
        res.status(400).json({ error: parseResult.error.format() });
        return;
      }

      const { prompt, conversationId } = parseResult.data;

      // Log request details
      console.log('Received prompt:', prompt);
      console.log('Conversation ID:', conversationId);
      console.log('conversations:', this.chatService.getConversations());

      // Process chat request
      const response = await this.chatService.processChat({
        prompt,
        conversationId,
      });

      res.json(response);
    } catch (error) {
      console.error('Chat controller error:', error);
      res.status(500).json({ error: 'Failed to generate response' });
    }
  }
}
