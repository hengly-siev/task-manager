import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err);
  res.status(500).json({
    message: err.message || 'Internal Server Error'
  });
};
