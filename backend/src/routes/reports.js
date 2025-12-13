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

        const sales = await Sale.findAll({
            where: { date: { [Op.between]: [startDate, endDate] } },
            include: [{ model: Vendor }]
        });

        // Agrupar ventas por vendedor
        const map = {};

        sales.forEach(sale => {
            const vid = sale.vendor_id;
            if (!map[vid]) {
                map[vid] = {
                    vendor: sale.Vendor ? sale.Vendor.name : 'Desconocido',
                    items: []
                };
            }

            map[vid].items.push({
                quantity_delivered: parseInt(sale.quantity_delivered),
                leftovers: parseInt(sale.leftovers),
                quantity_sold: parseInt(sale.quantity_sold),
                price_per_unit: parseFloat(sale.price_per_unit),
                total_sold: parseFloat(sale.total_sold),
                bills: parseFloat(sale.bills),
                coins: parseFloat(sale.coins),
                expenses: parseFloat(sale.expenses),
                total_to_deliver: parseFloat(sale.total_to_deliver),
                total_delivered: parseFloat(sale.total_delivered),
                remaining_balance: parseFloat(sale.remaining_balance)
            });
        });

        res.json(Object.values(map));

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message });
    }
});

module.exports = router;
