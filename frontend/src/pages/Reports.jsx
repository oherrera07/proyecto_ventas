import React, { useState } from 'react'
import { weeklyReport } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Reports() {
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [data, setData] = useState(null)
    const [msg, setMsg] = useState('')
    const nav = useNavigate()

    async function submit(e) {
        e.preventDefault();
        try {
            const r = await weeklyReport(start, end);
            setData(r);
        } catch (e) { setMsg('Error: ' + (e?.response?.data?.message || e.message)); }
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <div className='bg-white shadow-lg p-6 rounded-xl border border-gray-200'>
                <h1 className="text-xl font-bold mb-4">Reportes Semanales</h1>
                <form onSubmit={submit} className="flex flex-wrap gap-2 mb-4">
                    <input type="date" className='w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm' value={start} onChange={e => setStart(e.target.value)} />
                    <input type="date" className='w-full sm:w-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm' value={end} onChange={e => setEnd(e.target.value)} />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Generar</button>
                    <button type="button" onClick={() => nav('/')} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Volver</button>
                </form>

                {msg && <p className="text-red-600 mb-2">{msg}</p>}

                {data && data.map((v, i) => {
                    // calcular totales por vendedor
                    const totalQuantity = v.items.reduce((sum, item) => sum + item.quantity, 0)
                    const totalPrice = v.items.reduce((sum, item) => sum + item.quantity * item.price_per_unit, 0)
                    const totalReceived = v.items.reduce((sum, item) => sum + item.money_received, 0)
                    const totalPending = totalPrice - totalReceived

                    return (
                        <div key={i} className="border p-3 mb-4 rounded-lg">
                            <h2 className="text-lg font-bold mb-2">{v.vendor}</h2>

                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-1 text-left">Descripción</th>
                                        <th className="border p-1 text-right">Cantidad</th>
                                        <th className="border p-1 text-right">Precio/U</th>
                                        <th className="border p-1 text-right">Dinero recibido</th>
                                        <th className="border p-1 text-right">Saldo pendiente</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {v.items.map((item, j) => {
                                        const pending = (item.quantity * item.price_per_unit) - item.money_received
                                        return (
                                            <tr key={j} className="border-t">
                                                <td className="p-1">{item.description}</td>
                                                <td className="p-1 text-right">{item.quantity}</td>
                                                <td className="p-1 text-right">${item.price_per_unit.toFixed(2)}</td>
                                                <td className="p-1 text-right">${item.money_received.toFixed(2)}</td>
                                                <td className="p-1 text-right">${pending.toFixed(2)}</td>
                                            </tr>
                                        )
                                    })}
                                    {/* Totales por vendedor */}
                                    <tr className="border-t font-bold bg-gray-100">
                                        <td className="p-1">Totales</td>
                                        <td className="p-1 text-right">{totalQuantity}</td>
                                        <td className="p-1 text-right">${totalPrice.toFixed(2)}</td>
                                        <td className="p-1 text-right">${totalReceived.toFixed(2)}</td>
                                        <td className="p-1 text-right">${totalPending.toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
