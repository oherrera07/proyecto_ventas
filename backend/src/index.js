require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');


const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admins');
const reportRoutes = require('./routes/reports');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/reports', reportRoutes);


const PORT = process.env.PORT || 4000;


(async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    // sync models (in production use migrations)
    await require('./sync')();
    app.listen(PORT, () => console.log(`Server on ${PORT}`));
  } catch (err) {
    console.error('Failed to start', err);
  }
})();