const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Usuario y contraseña requeridos' });
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) return res.status(401).json({ message: 'Credenciales inválidas' });


  const ok = await bcrypt.compare(password, admin.password_hash);
  if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });


  const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});


module.exports = router;