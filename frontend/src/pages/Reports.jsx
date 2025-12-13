import React, { useState } from 'react';
import { weeklyReport } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Reports() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [data, setData] = useState([]);
    const [msg, setMsg] = useState('');
    const nav = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setMsg('');
        try {
            const r = await weeklyReport(start, end);
            setData(r || []);
        } catch (e) {
            setMsg('Error: ' + (e?.response?.data?.message || e.message));
        }
    }

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <div className='bg-white shadow-lg p-6 rounded-xl border border-gray-200'>
                <h1 className="text-xl font-bold mb-4">Reportes Semanales</h1>
                <form onSubmit={submit} className="flex flex-wrap gap-2 mb-4">
                    <input 
                        type="date" 
                        className='w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm' 
                        value={start} 
                        onChange={e => setStart(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        className='w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm' 
                        value={end} 
                        onChange={e => setEnd(e.target.value)} 
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Generar</button>
                    <button type="button" onClick={() => nav('/')} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Volver</button>
                </form>

                {msg && <p className="text-red-600 mb-2">{msg}</p>}

                {data.length === 0 && <p>No se encontraron ventas en este rango de fechas.</p>}

                {data.map((v, i) => {
                    const totalQuantityDelivered = v.items.reduce((sum, item) => sum + item.quantity_delivered, 0);
                    const totalLeftovers = v.items.reduce((sum, item) => sum + item.leftovers, 0);
                    const totalQuantitySold = v.items.reduce((sum, item) => sum + item.quantity_sold, 0);
                    const totalSales = v.items.reduce((sum, item) => sum + item.total_sold, 0);
                    const totalBills = v.items.reduce((sum, item) => sum + item.bills, 0);
                    const totalCoins = v.items.reduce((sum, item) => sum + item.coins, 0);
                    const totalExpenses = v.items.reduce((sum, item) => sum + item.expenses, 0);
                    const totalToDeliver = v.items.reduce((sum, item) => sum + item.total_to_deliver, 0);
                    const totalDelivered = v.items.reduce((sum, item) => sum + item.total_delivered, 0);
                    const totalBalance = v.items.reduce((sum, item) => sum + item.remaining_balance, 0);

                    return (
                        <div key={i} className="border p-3 mb-4 rounded-lg">
                            <h2 className="text-lg font-bold mb-2">{v.vendor}</h2>
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-1 text-left">Cant. Entregada</th>
                                        <th className="border p-1 text-left">Sobrantes</th>
                                        <th className="border p-1 text-left">Cant. Vendida</th>
                                        <th className="border p-1 text-left">Precio/U</th>
                                        <th className="border p-1 text-left">Total Ventas</th>
                                        <th className="border p-1 text-left">Billetes</th>
                                        <th className="border p-1 text-left">Monedas</th>
                                        <th className="border p-1 text-left">Gastos</th>
                                        <th className="border p-1 text-left">Total a Recibir</th>
                                        <th className="border p-1 text-left">Total Entregado</th>
                                        <th className="border p-1 text-left">Saldo Pendiente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {v.items.map((item, j) => (
                                        <tr key={j} className="border-t">
                                            <td className="p-1">{item.quantity_delivered}</td>
                                            <td className="p-1">{item.leftovers}</td>
                                            <td className="p-1">{item.quantity_sold}</td>
                                            <td className="p-1">${item.price_per_unit.toFixed(2)}</td>
                                            <td className="p-1">${item.total_sold.toFixed(2)}</td>
                                            <td className="p-1">${item.bills.toFixed(2)}</td>
                                            <td className="p-1">${item.coins.toFixed(2)}</td>
                                            <td className="p-1">${item.expenses.toFixed(2)}</td>
                                            <td className="p-1">${item.total_to_deliver.toFixed(2)}</td>
                                            <td className="p-1">${item.total_delivered.toFixed(2)}</td>
                                            <td className="p-1">${item.remaining_balance.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                    <tr className="border-t font-bold bg-gray-100">
                                        <td className="p-1">{totalQuantityDelivered}</td>
                                        <td className="p-1">{totalLeftovers}</td>
                                        <td className="p-1">{totalQuantitySold}</td>
                                        <td className="p-1">-</td>
                                        <td className="p-1">${totalSales.toFixed(2)}</td>
                                        <td className="p-1">${totalBills.toFixed(2)}</td>
                                        <td className="p-1">${totalCoins.toFixed(2)}</td>
                                        <td className="p-1">${totalExpenses.toFixed(2)}</td>
                                        <td className="p-1">${totalToDeliver.toFixed(2)}</td>
                                        <td className="p-1">${totalDelivered.toFixed(2)}</td>
                                        <td className="p-1">${totalBalance.toFixed(2)}</td>
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
