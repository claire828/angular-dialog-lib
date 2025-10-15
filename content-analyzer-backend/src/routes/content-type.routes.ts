import { Router } from 'express';
import { ContentTypeController } from '../controllers/content-types.controller';

export const contentTypeRouter = Router();

contentTypeRouter.use((req, res, next) => {
  console.log('contentTypeRouter:', req.method, req.originalUrl);
  next();
});

contentTypeRouter.get('/all', ContentTypeController.getAllSubscriptions);
contentTypeRouter.post('/create', ContentTypeController.createByType);
contentTypeRouter.get('/refresh', ContentTypeController.refresh);
