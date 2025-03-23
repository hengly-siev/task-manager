import { Request, Response, NextFunction } from 'express';
import TaskService from '../services/task.service';
import { AuthRequest } from '../middleware/auth.middleware';

class TaskController {
    public async createTask(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const authReq = req as AuthRequest;
          const taskData = { ...req.body, user: authReq.user.id };
          const task = await TaskService.createTask(taskData);
          res.status(201).json({ message: 'Task created', task });
        } catch (error) {
          next(error);
        }
      }
    
      public async getTasks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const authReq = req as AuthRequest;
          const tasks = await TaskService.getTasksByUser(authReq.user.id);
          res.status(200).json({ tasks });
        } catch (error) {
          next(error);
        }
      }

  public async getTaskById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json({ task });
    } catch (error) {
      next(error);
    }
  }

  public async updateTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await TaskService.updateTask(req.params.id, req.body);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json({ message: 'Task updated', task });
    } catch (error) {
      next(error);
    }
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const task = await TaskService.deleteTask(req.params.id);
      if (!task) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
