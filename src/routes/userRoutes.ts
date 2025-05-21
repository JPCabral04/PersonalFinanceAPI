import { Router } from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';

export const userRoutes = Router();

userRoutes.use(authMiddleware);

userRoutes.get('/', getAllUsers);
userRoutes.get('/:id', getUserById);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);
