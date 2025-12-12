import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import RegisterVendor from './pages/RegisterVendor'
import RecordSale from './pages/RecordSale'
import Reports from './pages/Reports'


function Private({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Private><AdminDashboard /></Private>} />
      <Route path="/register-vendor" element={<Private><RegisterVendor /></Private>} />
      <Route path="/record-sale" element={<Private><RecordSale /></Private>} />
      <Route path="/reports" element={<Private><Reports /></Private>} />
    </Routes>
  )
}