import React, { useState, useEffect } from 'react'
import { listVendors, createSale } from '../services/api'
import { useNavigate } from 'react-router-dom'
//import DashboardButton from "../components/DashboardButton";


export default function RecordSale() {
    const [vendors, setVendors] = useState([])
    const [vendorId, setVendorId] = useState('')
    const [date, setDate] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [msg, setMsg] = useState('')
    const [money, setMoney] = useState('')

    const nav = useNavigate()


    useEffect(() => { (async () => { try { const v = await listVendors(); setVendors(v); } catch (e) { setMsg('Error cargando vendedores'); } })(); }, []);


    async function submit(e) {
        e.preventDefault();
        try {
            await createSale({
                vendor_id: vendorId,
                date,
                quantity: parseInt(quantity),
                price_per_unit: parseFloat(price),
                money_received: parseFloat(money),
                description: desc
            });

            setMsg('Venta registrada');
            setQuantity(0); setPrice(0); setDesc('');
        } catch (e) { setMsg('Error: ' + (e?.response?.data?.message || e.message)); }
    }


    return (
        <div className="p-8 max-w-md mx-auto">
            
            <div className='bg-white shadow-lg p-6 rounded-xl border border-gray-200'>
            <h1 className="text-xl mb-4">Registrar Venta</h1>
            <form onSubmit={submit} className="space-y-3">
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={vendorId} onChange={e => setVendorId(e.target.value)}>
                    <option value="">-- Selecciona vendedor --</option>
                    {vendors.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
                <input className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" type="date" value={date} onChange={e => setDate(e.target.value)} />
                <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="Cantidad vendida"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="Precio Unitario"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    step="0.01"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    placeholder="Dinero recibido"
                    value={money}
                    onChange={(e) => setMoney(e.target.value)}
                />

                <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Descripción" />
                <div className="flex space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Guardar</button>
                    <button type="button" onClick={() => nav('/')} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Volver</button>
                </div>
            </form>
            {msg && <p className="mt-2">{msg}</p>}
            </div>
        </div>
    )
}