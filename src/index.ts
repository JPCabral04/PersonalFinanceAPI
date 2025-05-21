import { AppDataSource } from './data-source';
import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from './routes/authRoutes';
import { userRoutes } from './routes/userRoutes';
import { accountRoutes } from './routes/accountRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/accounts', accountRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco:', err);
  });
