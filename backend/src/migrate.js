// archivo simple para correr migraciones SQL si prefieres
const { sequelize } = require('./config/database');
(async () => {
    try {
        await sequelize.authenticate();
        console.log('conectado');
        await sequelize.sync({ alter: true });
        console.log('migrado');
        process.exit(0);
    } catch (e) { console.error(e); process.exit(1); }
})();