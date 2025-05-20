import { Router } from 'express';
import { login, register } from '../controllers/authController';

export const auth = Router();

auth.post('/register', register);
auth.post('/login', login);
