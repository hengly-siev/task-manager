import { Request, Response, NextFunction } from 'express';
import AuthService from '../services/auth.service';

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      if (!result) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      res.status(200).json({ message: 'Login successful', token: result.token });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
