const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada.',
  });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    message: 'Erro interno do servidor.',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`API disponível em http://localhost:${port}`);
});
