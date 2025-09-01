import type { Conversation } from '../types/chat.types.js';

export class ConversationRepository {
  private conversations = new Map<string, string>();

  getLastResponseId(conversationId: string): string | undefined {
    return this.conversations.get(conversationId);
  }

  saveConversation(conversationId: string, responseId: string): void {
    this.conversations.set(conversationId, responseId);
  }

  getAllConversations(): Map<string, string> {
    return this.conversations;
  }

  deleteConversation(conversationId: string): boolean {
    return this.conversations.delete(conversationId);
  }
}
