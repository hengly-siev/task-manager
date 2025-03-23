import Task, { ITask } from '../models/task.model';
import { Types } from 'mongoose';

class TaskService {
  public async createTask(taskData: Partial<ITask>): Promise<ITask> {
    const task = new Task(taskData);
    return task.save();
  }

  public async getTasksByUser(userId: string): Promise<ITask[]> {
    return Task.find({ user: new Types.ObjectId(userId) });
  }

  public async getTaskById(taskId: string): Promise<ITask | null> {
    return Task.findById(taskId);
  }

  public async updateTask(taskId: string, updateData: Partial<ITask>): Promise<ITask | null> {
    return Task.findByIdAndUpdate(taskId, updateData, { new: true });
  }

  public async deleteTask(taskId: string): Promise<ITask | null> {
    return Task.findByIdAndDelete(taskId);
  }
}

export default new TaskService();
