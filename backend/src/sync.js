const { sequelize } = require('./config/database');
const Admin = require('./models/Admin');
const Vendor = require('./models/Vendor');
const Sale = require('./models/Sale');
const bcrypt = require('bcrypt');


module.exports = async function () {
    await sequelize.sync({ alter: true });


    // ensure two admins exist (only for development)
    const rounds = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);
    const a1 = await Admin.findOne({ where: { username: 'admin1' } });
    if (!a1) {
        const h = await bcrypt.hash('adminpass1', rounds);
        await Admin.create({ username: 'admin1', password_hash: h });
    }
    const a2 = await Admin.findOne({ where: { username: 'admin2' } });
    if (!a2) {
        const h = await bcrypt.hash('adminpass2', rounds);
        await Admin.create({ username: 'admin2', password_hash: h });
    }


    console.log('Sync complete');
};