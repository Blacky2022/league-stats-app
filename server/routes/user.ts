import { Router } from 'express';
import { authenticateToken } from '../middlewares/token.middleware';
import { protectedEndpoint, signup, signin, logout, authenticate } from '../controllers/user.controller';

export const userRouter = Router();

userRouter
  .post('/signup', signup)
  .post('/signin', signin)
  .post('/logout', logout)
  .post('/auth', authenticateToken, authenticate)
  .post('/protected-endpoint', authenticateToken, protectedEndpoint);
