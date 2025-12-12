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
    const { vendor_id, date, quantity, price_per_unit, description, money_received } = req.body;

    if (!vendor_id || !date || quantity == null || price_per_unit == null || money_received == null) {
      return res.status(400).json({ message: 'Campos faltantes' });
    }

    const sale = await Sale.create({
      vendor_id,
      date,
      quantity,
      price_per_unit,
      description,
      money_received,
      created_by: req.user.id
    });

    res.json(sale);

  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



module.exports = router;