import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  createAccount,
  deleteAccount,
  getAccounts,
  updateAccount,
} from '../controllers/accountController';

export const accountRoutes = Router();

accountRoutes.use(authMiddleware);

accountRoutes.post('/', createAccount);
accountRoutes.get('/', getAccounts);
accountRoutes.put('/:id', updateAccount);
accountRoutes.delete('/:id', deleteAccount);
