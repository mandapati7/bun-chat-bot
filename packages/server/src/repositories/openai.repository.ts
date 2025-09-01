import OpenAI from 'openai';
import type { OpenAIResponse } from '../types/chat.types.js';

export class OpenAIRepository {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateResponse(prompt: string, previousResponseId?: string): Promise<OpenAIResponse> {
    const response = await this.client.responses.create({
      model: 'gpt-4o-mini',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: previousResponseId,
    });

    return {
      id: response.id,
      output_text: response.output_text,
    };
  }
}
