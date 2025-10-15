import { Request, Response } from 'express';
import { ApiResponse } from '../index';
import { GeminiService } from '../services';

export class ContentTypeController {
  // TODO: Simulate fetching content types from a database or service'
  static subscriptions = [
    { id: 1, type: 'youtube', name: '@Angular' },
    { id: 2, type: 'youtube', name: '@JoshuaMorony' },
    { id: 3, type: 'blog', name: 'AI' }
  ];

  static async getAllSubscriptions(_req: Request, res: Response): Promise<void> {
    try {
      // TODO: Validate
      ApiResponse.success(res, ContentTypeController.subscriptions, 200);
    } catch (error) {
      console.error('Error fetching content types:', error);
      ApiResponse.error(res, 'Internal Server Error: Failed to fetch content types');
    }
  }

  // TODO: Create, Update , Remove
  static async createByType(req: Request, res: Response): Promise<void> {
    const { type, name } = req.body;
    console.log('✅ 新增 content type:', type, name);
    ContentTypeController.subscriptions = [...ContentTypeController.subscriptions,
    { id: ContentTypeController.subscriptions.length, type, name }];
    ApiResponse.success(res, { message: '✅ Content type created successfully' }, 201);
  }

  static async refresh(_req: Request, res: Response): Promise<void> {
    // TODO: Fetch Google API
    console.log('✅ refresh');
    try {
      const data = await GeminiService.generateContent();
      ApiResponse.success(res, data);
    } catch (error) {
      console.error('Error refreshing content:', error);
      ApiResponse.error(res, 'Internal Server Error: Failed to refresh content');
    }

  }

}
