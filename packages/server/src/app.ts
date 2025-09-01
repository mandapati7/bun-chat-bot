import express from 'express';
import healthRoutes from './routes/health.routes.js';
import chatRoutes from './routes/chat.routes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/', chatRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
