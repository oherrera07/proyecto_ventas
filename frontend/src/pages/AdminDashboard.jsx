import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function AdminDashboard() {
    const nav = useNavigate();
    function logout() { localStorage.removeItem('token'); nav('/login'); }
    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div className='bg-white shadow-lg p-6 rounded-xl border border-gray-200'>
                <h1 className="text-2xl mb-4">Panel Administrador</h1>
                <div className="space-x-2">
                    <Link to="/register-vendor"><button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Registrar Vendedor</button></Link>
                    <Link to="/record-sale"><button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Registrar Venta</button></Link>
                    <Link to="/reports"><button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Reportes</button></Link>
                    <button onClick={logout} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Cerrar sesión</button>
                </div>
            </div>
        </div>
    )
}