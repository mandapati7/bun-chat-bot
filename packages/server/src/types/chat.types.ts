export interface ChatRequest {
  prompt: string;
  conversationId: string;
}

export interface ChatResponse {
  message: string;
}

export interface Conversation {
  id: string;
  lastResponseId: string;
}

export interface OpenAIResponse {
  id: string;
  output_text: string;
}
