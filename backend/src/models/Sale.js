const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Vendor = require('./Vendor');

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendor_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  price_per_unit: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  description: { type: DataTypes.TEXT, allowNull: true },

  // NUEVO CAMPO
  money_received: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },

  created_by: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'sales',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Sale.belongsTo(Vendor, { foreignKey: 'vendor_id' });
module.exports = Sale;
