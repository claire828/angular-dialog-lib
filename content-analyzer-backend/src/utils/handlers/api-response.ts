import { Response } from 'express';

export class ApiResponse {
  static success(res: Response, data: any, status: number = 200) {
    return res.status(status).json(data);
  }

  static error(res: Response, message: string, status: number = 500) {
    return res.status(status).json({ error: message });
  }

}
