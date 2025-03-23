import jwt, { SignOptions } from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET as string;
// Explicitly cast as ms.StringValue
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as unknown as jwt.SignOptions['expiresIn'];

class AuthService {
  public async register(userData: Partial<IUser>): Promise<IUser> {
    const user = new User(userData);
    return user.save();
  }

  public async login(email: string, password: string): Promise<{ user: IUser; token: string } | null> {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return null;
    }
    const payload = { id: user._id, role: user.role };
    const signOptions: SignOptions = { expiresIn: JWT_EXPIRES_IN };
    const token = jwt.sign(payload, JWT_SECRET, signOptions);
    return { user, token };
  }
}

export default new AuthService();
