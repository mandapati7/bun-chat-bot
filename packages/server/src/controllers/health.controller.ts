import type { Request, Response } from 'express';

export class HealthController {
  async handleHello(req: Request, res: Response): Promise<void> {
    res.json({ message: 'Hello, World from API!' });
  }

  async handleRoot(req: Request, res: Response): Promise<void> {
    res.send('Hello, World!');
  }

  async handleHealth(req: Request, res: Response): Promise<void> {
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }
}
