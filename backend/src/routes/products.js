const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { rows } = await pool.query(`
      SELECT id, name, price, created_at
      FROM products
      ORDER BY id
    `);

    res.json(rows);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `
        SELECT id, name, price, created_at
        FROM products
        WHERE id = $1
      `,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Produto não encontrado.',
      });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  const name = String(req.body.name || '').trim();
  const price = Number(req.body.price);

  if (!name || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({
      message: 'Informe um nome e um preço válido.',
    });
  }

  try {
    const { rows } = await pool.query(
      `
        INSERT INTO products (name, price)
        VALUES ($1, $2)
        RETURNING id, name, price, created_at
      `,
      [name, price]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  const name = String(req.body.name || '').trim();
  const price = Number(req.body.price);

  if (!name || !Number.isFinite(price) || price < 0) {
    return res.status(400).json({
      message: 'Informe um nome e um preço válido.',
    });
  }

  try {
    const { rows } = await pool.query(
      `
        UPDATE products
        SET name = $1,
            price = $2
        WHERE id = $3
        RETURNING id, name, price, created_at
      `,
      [name, price, req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'Produto não encontrado.',
      });
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1',
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: 'Produto não encontrado.',
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
