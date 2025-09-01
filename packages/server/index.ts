import express from 'express';
import type { Request, Response } from 'express';
import OpenAI from 'openai';
import z from 'zod';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.send({ message: 'Hello, World from API!' });
});

let lastResponseId: string | null = null;
const conversations = new Map<string, string>();
const chatSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(1, 'Prompt is required')
    .max(1000, 'Prompt is too long, max 1000 characters'),
  conversationId: z.string().uuid(),
});
app.post('/api/chat', async (req: Request, res: Response) => {
  const parseResult = chatSchema.safeParse(req.body);
  console.log('parseResult:', parseResult);
  if (!parseResult.success) {
    return res.status(400).json({ error: parseResult.error.format() });
  }
  const { prompt, conversationId } = parseResult.data;
  // Log both prompt and conversationIds
  console.log('Received prompt:', prompt);
  console.log('Conversation ID:', conversationId);
  console.log('conversations:', conversations);

  if (!prompt) {
    return res.status(400).json({ error: 'Messages are required' });
  }

  try {
    const response = await client.responses.create({
      model: 'gpt-4o-mini!',
      input: prompt,
      temperature: 0.2,
      max_output_tokens: 100,
      previous_response_id: conversationId ? conversations.get(conversationId) : undefined,
    });

    if (conversationId) {
      conversations.set(conversationId, response.id);
    }

    lastResponseId = response.id;

    res.json({ message: response.output_text });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});
