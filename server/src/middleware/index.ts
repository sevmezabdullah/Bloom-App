import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export interface AuthRequest extends Request {
  user: string;
}
interface JwtPayload {
  _id: string;
}
export const authenticationMiddleware = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({
        error: 'Authorization is required',
      });
    }

    const token = authorization;
    const { _id } = jwt.verify(token, 'express') as JwtPayload;
    const existingUser = await User.findOne({ _id });

    if (existingUser) {
      request.user = existingUser.id;
    }
    next();
  } catch (error) {
    console.log('Error in authentication Middleware', error);
    throw error;
  }
};
