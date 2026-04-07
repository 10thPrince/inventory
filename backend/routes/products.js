import { Router } from 'express';
import { query } from '../config/db.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Name, price, and quantity are required.' });
    }

    const result = await query(
      'INSERT INTO products (name, price, quantity, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
      [name, Number(price), Number(quantity)]
    );
    return res.status(201).json({ success: true, message: 'Product created.', id: result.insertId });
  } catch (err) {
    console.error('Create product error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.get('/', async (_req, res) => {
  try {
    const products = await query('SELECT * FROM products ORDER BY created_at DESC');
    return res.json({ success: true, products });
  } catch (err) {
    console.error('List products error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await query('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    return res.json({ success: true, product: rows[0] });
  } catch (err) {
    console.error('Get product error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    const rows = await query('SELECT id FROM products WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    await query(
      'UPDATE products SET name = ?, price = ?, quantity = ?, updated_at = NOW() WHERE id = ?',
      [name, Number(price), Number(quantity), id]
    );
    return res.json({ success: true, message: 'Product updated.' });
  } catch (err) {
    console.error('Update product error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM products WHERE id = ?', [id]);
    if (!result.affectedRows) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    return res.json({ success: true, message: 'Product deleted.' });
  } catch (err) {
    console.error('Delete product error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.patch('/:id/increase', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount = 1 } = req.body;
    const rows = await query('SELECT quantity FROM products WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    const increment = Number(amount) || 0;
    const newQty = rows[0].quantity + increment;
    await query('UPDATE products SET quantity = ?, updated_at = NOW() WHERE id = ?', [newQty, id]);
    return res.json({ success: true, message: 'Quantity increased.', quantity: newQty });
  } catch (err) {
    console.error('Increase stock error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

router.patch('/:id/decrease', async (req, res) => {
  try {
    const { id } = req.params;
    const { amount = 1 } = req.body;
    const rows = await query('SELECT quantity FROM products WHERE id = ?', [id]);
    if (!rows.length) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }
    const decrement = Number(amount) || 0;
    const newQty = rows[0].quantity - decrement;
    if (newQty < 0) {
      return res.status(400).json({ success: false, message: 'Quantity cannot go negative.' });
    }
    await query('UPDATE products SET quantity = ?, updated_at = NOW() WHERE id = ?', [newQty, id]);
    return res.json({ success: true, message: 'Quantity decreased.', quantity: newQty });
  } catch (err) {
    console.error('Decrease stock error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;