import { loginUser, registerUser } from '../services/authService';
import { status } from 'http-status';

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(status.CREATED).json(user);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.status(status.OK).json(token);
  } catch (err) {
    res.status(status.UNAUTHORIZED).json({ error: err.message });
  }
};
