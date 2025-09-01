import express from 'express';
import type { Request, Response } from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let lastResponseId: string | null = null;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/api/chat', async (req: Request, res: Response) => {
  console.log('Received request:', req.body);
  const { prompt } = req.body;
  console.log('Received prompt:', prompt);

  if (!prompt) {
    return res.status(400).send({ error: 'Messages are required' });
  }

  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    temperature: 0.2,
    max_output_tokens: 100,
    previous_response_id: lastResponseId || undefined,
  });

  lastResponseId = response.id;

  res.json({ message: response.output_text });
});
