const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const auth = require('../middleware/auth');
const Sale = require('../models/Sale');
const Vendor = require('../models/Vendor');


// POST /api/reports/weekly { startDate: 'YYYY-MM-DD', endDate: 'YYYY-MM-DD' }
router.post('/weekly', auth, async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        if (!startDate || !endDate) return res.status(400).json({ message: 'startDate y endDate requeridos' });

        const rows = await Sale.findAll({
            where: { date: { [Op.between]: [startDate, endDate] } },
            include: [{ model: Vendor }]
        });

        // Estructura final:
        // [
        //   {
        //     vendor: 'Juan',
        //     items: [
        //       { description: 'Producto A', quantity: 5, price_per_unit: 10, money_received: 50 },
        //       { description: 'Producto B', quantity: 2, price_per_unit: 20, money_received: 40 }
        //     ]
        //   }
        // ]

        const map = {};

        rows.forEach(sale => {
            const vid = sale.vendor_id;

            if (!map[vid]) {
                map[vid] = {
                    vendor: sale.Vendor ? sale.Vendor.name : 'Desconocido',
                    items: []
                };
            }

            map[vid].items.push({
                description: sale.description || 'Sin descripción',
                quantity: sale.quantity,
                price_per_unit: parseFloat(sale.price_per_unit),
                money_received: parseFloat(sale.money_received)
            });
        });

        res.json(Object.values(map));

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});



module.exports = router;