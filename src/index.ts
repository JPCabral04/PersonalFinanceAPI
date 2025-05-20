import { AppDataSource } from './data-source';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Rota principal
app.get('/', (req: any, res: any) => {
  res.send('Hello World!');
});

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar no banco:', err);
  });
