const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Vendor = require('../models/Vendor');
const Sale = require('../models/Sale');


// Crear vendedor
router.post('/vendors', auth, async (req, res) => {
  try {
    const { name, notes } = req.body;
    if (!name) return res.status(400).json({ message: 'Nombre requerido' });
    const vendor = await Vendor.create({ name, notes });
    res.json(vendor);
  } catch (e) { res.status(500).json({ message: e.message }); }
});


// Listar vendedores
router.get('/vendors', auth, async (req, res) => {
  const vendors = await Vendor.findAll({ order: [['name', 'ASC']] });
  res.json(vendors);
});


// Registrar venta (admin registra ventas por vendedor)
router.post('/sales', auth, async (req, res) => {
  try {
    const { vendor_id, date, quantity_delivered, leftovers,
      quantity_sold, price_per_unit, total_sold,
      bills, coins, expenses, total_to_deliver,
      total_delivered, remaining_balance } = req.body;

    if (!vendor_id || !date || quantity_delivered == null
      || price_per_unit == null || leftovers == null
      || quantity_sold == null || total_sold == null
      || bills == null || coins == null || expenses == null
      || total_to_deliver == null || total_delivered == null
    ) {
      return res.status(400).json({ message: 'Campos faltantes' });
    }

    const sale = await Sale.create({
      vendor_id,
      date,
      quantity_delivered,
      leftovers,
      quantity_sold,
      price_per_unit,
      total_sold,
      bills,
      coins,
      expenses,
      total_to_deliver,
      total_delivered,
      remaining_balance,

      created_by: req.user.id
    });

    res.json(sale);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



module.exports = router;