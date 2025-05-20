import status from 'http-status';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth)
    return res.status(status.UNAUTHORIZED).json({ message: 'Token ausente' });

  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch {
    res.status(status.UNAUTHORIZED).json({ message: 'Token inválido' });
  }
};
