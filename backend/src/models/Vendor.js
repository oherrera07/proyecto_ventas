const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');


const Vendor = sequelize.define('Vendor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  notes: { type: DataTypes.TEXT, allowNull: true }
}, { tableName: 'vendors', timestamps: true, createdAt: 'created_at', updatedAt: false });


module.exports = Vendor;