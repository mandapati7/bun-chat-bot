import { ConversationRepository } from '../repositories/conversation.repository.js';
import { OpenAIRepository } from '../repositories/openai.repository.js';
import type { ChatRequest, ChatResponse } from '../types/chat.types.js';

export class ChatService {
  private conversationRepository: ConversationRepository;
  private openAIRepository: OpenAIRepository;
  private lastResponseId: string | null = null;

  constructor() {
    this.conversationRepository = new ConversationRepository();
    this.openAIRepository = new OpenAIRepository();
  }

  async processChat(chatRequest: ChatRequest): Promise<ChatResponse> {
    const { prompt, conversationId } = chatRequest;

    try {
      // Get previous response ID for conversation continuity
      const previousResponseId = conversationId
        ? this.conversationRepository.getLastResponseId(conversationId)
        : undefined;

      // Generate response from OpenAI
      const openAIResponse = await this.openAIRepository.generateResponse(
        prompt,
        previousResponseId
      );

      // Save conversation state
      if (conversationId) {
        this.conversationRepository.saveConversation(conversationId, openAIResponse.id);
      }

      // Update last response ID
      this.lastResponseId = openAIResponse.id;

      return {
        message: openAIResponse.output_text,
      };
    } catch (error) {
      console.error('Chat service error:', error);
      throw new Error('Failed to process chat request');
    }
  }

  getLastResponseId(): string | null {
    return this.lastResponseId;
  }

  getConversations(): Map<string, string> {
    return this.conversationRepository.getAllConversations();
  }
}
