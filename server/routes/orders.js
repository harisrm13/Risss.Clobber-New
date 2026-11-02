import { Router } from 'express';
import { pool, query } from '../db.js';
import { asyncRoute, authenticate, validateBody } from '../middleware.js';
import { makeOrderNumber, numeric } from '../utils.js';

export const ordersRouter = Router();

ordersRouter.post('/', authenticate, validateBody(['customerName', 'customerEmail', 'customerPhone', 'shippingAddress', 'shippingCity', 'shippingPostalCode', 'courier', 'paymentMethod']), asyncRoute(async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const cart = await client.query(`
      SELECT ci.product_id, ci.size, ci.quantity, p.name, p.price, p.discount_price, p.primary_color,
             b.name AS brand_name, ps.stock
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      JOIN brands b ON b.id = p.brand_id
      JOIN product_sizes ps ON ps.product_id = ci.product_id AND ps.size_label = ci.size
      WHERE ci.user_id = $1
      FOR UPDATE OF ps`, [req.user.id]);

    if (!cart.rows.length) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'Keranjang belanja kosong.' });
    }

    const items = [];
    let subtotal = 0;
    for (const item of cart.rows) {
      if (item.quantity > item.stock) {
        await client.query('ROLLBACK');
        return res.status(409).json({ error: `Stok ${item.name} (${item.size}) tidak mencukupi (sisa ${item.stock}).` });
      }
      const unitPrice = Number(item.discount_price) > 0 ? Number(item.discount_price) : Number(item.price);
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;
      items.push({ ...item, unitPrice, lineTotal });
    }

    const shippingCost = Math.max(0, numeric(req.body.shippingCost, 0));
    const discountAmount = Math.max(0, numeric(req.body.discountAmount, 0));
    const totalAmount = subtotal + shippingCost - discountAmount;
    const orderNumber = makeOrderNumber();

    const insertOrder = await client.query(`
      INSERT INTO orders
        (order_number, user_id, customer_name, customer_email, customer_phone, shipping_address, shipping_city, shipping_postal_code, courier, payment_method, subtotal, shipping_cost, discount_amount, total_amount, order_status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'Pending')
      RETURNING *`,
      [orderNumber, req.user.id, req.body.customerName, req.body.customerEmail, req.body.customerPhone, req.body.shippingAddress, req.body.shippingCity, req.body.shippingPostalCode, req.body.courier, req.body.paymentMethod, subtotal, shippingCost, discountAmount, totalAmount]
    );

    const order = insertOrder.rows[0];

    for (const item of items) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, product_name, brand_name, size, color, unit_price, quantity, line_total)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [order.id, item.product_id, item.name, item.brand_name, item.size, item.primary_color, item.unitPrice, item.quantity, item.lineTotal]
      );

      await client.query('UPDATE product_sizes SET stock = stock - $1 WHERE product_id = $2 AND size_label = $3', [item.quantity, item.product_id, item.size]);
      await client.query('UPDATE products SET total_stock = total_stock - $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2', [item.quantity, item.product_id]);
    }

    await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id]);
    await client.query('COMMIT');

    res.status(201).json({
      message: 'Pesanan berhasil dibuat.',
      data: order
    });
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}));

ordersRouter.get('/:orderNumber', authenticate, asyncRoute(async (req, res) => {
  const orderRes = await query('SELECT * FROM orders WHERE order_number = $1 AND (user_id = $2 OR $3 = true)', [req.params.orderNumber, req.user.id, req.user.role === 'admin']);
  if (!orderRes.rows.length) return res.status(404).json({ error: 'Pesanan tidak ditemukan.' });

  const itemsRes = await query('SELECT * FROM order_items WHERE order_id = $1', [orderRes.rows[0].id]);
  res.json({
    data: {
      ...orderRes.rows[0],
      items: itemsRes.rows
    }
  });
}));
