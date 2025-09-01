import { Router } from 'express';
import { HealthController } from '../controllers/health.controller.js';

const router = Router();
const healthController = new HealthController();

// Bind methods to preserve 'this' context
router.get('/', healthController.handleRoot.bind(healthController));
router.get('/api/hello', healthController.handleHello.bind(healthController));
router.get('/api/health', healthController.handleHealth.bind(healthController));

export default router;
