import React, { useState, useEffect } from 'react';
import { listVendors, weeklyReport } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function Reports() {
    const [vendors, setVendors] = useState([]);
    const [vendorId, setVendorId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');
    const nav = useNavigate();

    // Cargar vendedores
    useEffect(() => {
        listVendors().then(setVendors).catch(() => setMsg('Error cargando vendedores'));
    }, []);

    // Generar reporte
    async function submit(e) {
        e.preventDefault();
        setMsg('');
        try {
            const reportData = await weeklyReport(startDate, endDate, vendorId || undefined);
            setData(reportData || []);
            if (reportData.length === 0) setMsg('No se encontraron ventas en este rango.');
        } catch (err) {
            setMsg('Error al generar reporte');
        }
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Header /> {/* Aquí van los logos */}
            <div className="bg-white p-6 rounded-xl shadow border">
                <h1 className="text-2xl font-bold mb-6">Reportes Semanales</h1>

                {/* FORMULARIO DE FILTRO */}
                <form onSubmit={submit} className="flex flex-wrap gap-3 mb-6 items-center">
                    <select
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={vendorId}
                        onChange={e => setVendorId(e.target.value)}
                    >
                        <option value="">Todos los vendedores</option>
                        {vendors.map(v => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                        ))}
                    </select>

                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={startDate}
                        onChange={e => setStartDate(e.target.value)}
                    />

                    <input
                        type="date"
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        value={endDate}
                        onChange={e => setEndDate(e.target.value)}
                    />

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold">
                        Generar
                    </button>

                    <button
                        type="button"
                        onClick={() => nav('/')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold"
                    >
                        Volver
                    </button>
                </form>

                {/* MENSAJE */}
                {msg && <p className="text-red-600 mb-4 font-semibold">{msg}</p>}

                {/* TABLAS POR VENDEDOR */}
                {data.map((vendorReport, i) => {
                    const totals = vendorReport.items.reduce((acc, item) => {
                        acc.quantity_delivered += item.quantity_delivered;
                        acc.leftovers += item.leftovers;
                        acc.quantity_sold += item.quantity_sold;
                        acc.total_sold += item.total_sold;
                        acc.expenses += item.expenses;
                        acc.bills += item.bills;
                        acc.coins += item.coins;
                        acc.total_to_deliver += item.total_to_deliver;
                        acc.total_delivered += item.total_delivered;
                        acc.remaining_balance += item.remaining_balance;
                        return acc;
                    }, {
                        quantity_delivered:0, leftovers:0, quantity_sold:0,
                        total_sold:0, expenses:0, bills:0, coins:0,
                        total_to_deliver:0, total_delivered:0, remaining_balance:0
                    });

                    return (
                        <div key={i} className="mb-8 border rounded-lg p-4 shadow-sm">
                            <h2 className="text-lg font-bold mb-3">{vendorReport.vendor}</h2>
                            <table className="w-full text-sm border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-1 text-left">Fecha</th>
                                        <th className="border p-1 text-left">Cant. Entregada</th>
                                        <th className="border p-1 text-left">Sobrantes</th>
                                        <th className="border p-1 text-left">Cant. Vendida</th>
                                        <th className="border p-1 text-left">Precio/U</th>
                                        <th className="border p-1 text-left">Total Ventas</th>
                                        <th className="border p-1 text-left">Gastos</th>
                                        <th className="border p-1 text-left">Billetes</th>
                                        <th className="border p-1 text-left">Monedas</th>
                                        <th className="border p-1 text-left">Total a Recibir</th>
                                        <th className="border p-1 text-left">Total Entregado</th>
                                        <th className="border p-1 text-left">Saldo Pendiente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendorReport.items.map((item, j) => (
                                        <tr key={j} className="border-t">
                                            <td className="p-1">{item.date}</td>
                                            <td className="p-1">{item.quantity_delivered}</td>
                                            <td className="p-1">{item.leftovers}</td>
                                            <td className="p-1">{item.quantity_sold}</td>
                                            <td className="p-1">${item.price_per_unit.toFixed(2)}</td>
                                            <td className="p-1">${item.total_sold.toFixed(2)}</td>
                                            <td className="p-1">${item.expenses.toFixed(2)}</td>
                                            <td className="p-1">${item.bills.toFixed(2)}</td>
                                            <td className="p-1">${item.coins.toFixed(2)}</td>
                                            <td className="p-1">${item.total_to_deliver.toFixed(2)}</td>
                                            <td className="p-1">${item.total_delivered.toFixed(2)}</td>
                                            <td className="p-1">${item.remaining_balance.toFixed(2)}</td>
                                        </tr>
                                    ))}

                                    {/* FILA DE TOTALES */}
                                    <tr className="border-t font-bold bg-gray-100">
                                        <td className="p-1">Totales</td>
                                        <td className="p-1">{totals.quantity_delivered}</td>
                                        <td className="p-1">{totals.leftovers}</td>
                                        <td className="p-1">{totals.quantity_sold}</td>
                                        <td className="p-1">-</td>
                                        <td className="p-1">${totals.total_sold.toFixed(2)}</td>
                                        <td className="p-1">${totals.expenses.toFixed(2)}</td>
                                        <td className="p-1">${totals.bills.toFixed(2)}</td>
                                        <td className="p-1">${totals.coins.toFixed(2)}</td>
                                        <td className="p-1">${totals.total_to_deliver.toFixed(2)}</td>
                                        <td className="p-1">${totals.total_delivered.toFixed(2)}</td>
                                        <td className="p-1">${totals.remaining_balance.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
