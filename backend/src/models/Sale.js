const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Vendor = require('./Vendor');

const Sale = sequelize.define('Sale', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  vendor_id: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  quantity_delivered: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  leftovers: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  quantity_sold: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  price_per_unit: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  total_sold: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  bills: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  coins: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  expenses: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  total_to_deliver: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  total_delivered: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  remaining_balance: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.00 },
  created_by: { type: DataTypes.INTEGER, allowNull: true }
}, {
  tableName: 'sales',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

Sale.belongsTo(Vendor, { foreignKey: 'vendor_id' });
module.exports = Sale;
