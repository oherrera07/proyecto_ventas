import React, { useState, useEffect } from 'react'
import { listVendors, createSale } from '../services/api'
import { useNavigate } from 'react-router-dom'
//import DashboardButton from "../components/DashboardButton";


export default function RecordSale() {
    const [vendors, setVendors] = useState([])
    const [vendorId, setVendorId] = useState('')
    const [date, setDate] = useState('')
    const [quantity1, setQuantity1] = useState('')
    const [leftovers, setLeftovers] = useState('')
    const [quantity2, setQuantity2] = useState('')
    const [price, setPrice] = useState('')
    const [total1, setTotal1] = useState('')
    const [bills, setBills] = useState('')
    const [coins, setCoins] = useState('')
    const [expenses, setExpenses] = useState('')
    const [total2, setTotal2] = useState('')
    const [total3, setTotal3] = useState('')
    const [balance, setBalance] = useState('')

    const [msg, setMsg] = useState('')


    const nav = useNavigate()


    useEffect(() => { (async () => { try { const v = await listVendors(); setVendors(v); } catch (e) { setMsg('Error cargando vendedores'); } })(); }, []);

    useEffect(() => {
        const q1 = parseInt(quantity1) || 0
        const l1 = parseInt(leftovers) || 0
        setQuantity2(q1 - l1)
    }, [quantity1, leftovers])

    useEffect(() => {
        const qs = parseInt(quantity2) || 0
        const up = parseFloat(price) || 0
        setTotal1(qs * up)
    }, [quantity2, price])

    
    //total to deliver
    useEffect(() => {
        const t1 = parseInt(total1) || 0
        const exp = parseInt(expenses) || 0
        setTotal2(t1 - exp)
    }, [total1, expenses])

    //total delivered
    useEffect(() => {
        const b = parseInt(bills) || 0
        const c= parseInt(coins) || 0
        setTotal3(b + c)
    }, [bills, coins])

    //balance
    useEffect(() => {
        const ttd = parseInt(total2) || 0
        const td= parseInt(total3) || 0
        setBalance(ttd - td)
    }, [total2, total3])



    async function submit(e) {
        e.preventDefault();
        try {
            await createSale({
                vendor_id: vendorId,
                date,
                quantity_delivered: parseInt(quantity1),
                leftovers: parseInt(leftovers),
                quantity_sold: parseInt(quantity2),
                price_per_unit: parseFloat(price),
                total_sold: parseFloat(total1),
                bills: parseFloat(bills),
                coins: parseFloat(coins),
                expenses: parseFloat(expenses),
                total_to_deliver: parseFloat(total2),
                total_delivered: parseFloat(total3),
                remaining_balance: parseFloat(balance)

            });

            setMsg('Venta registrada');
            setQuantity1('');
            setLeftovers('');
            setQuantity2('');
            setPrice('');
            setTotal1('');
            setCoins('');
            setBills('');
            setExpenses('');
            setTotal2('');
            setTotal3('');
            setBalance('');


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
                    <input className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)} />
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Cantidad Entregada"
                        value={quantity1}
                        onChange={(e) => setQuantity1(e.target.value)}
                    />
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Sobrantes"
                        value={leftovers}
                        onChange={(e) => setLeftovers(e.target.value)}
                    />

                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Cantidad Vendida"
                        value={quantity2}
                        readOnly
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
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Total Ventas"
                        value={total1}
                        readOnly
                    />

                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Billetes"
                        value={bills}
                        onChange={(e) => setBills(e.target.value)}
                    />

                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Monedas"
                        value={coins}
                        onChange={(e) => setCoins(e.target.value)}
                    />

                    <input
                        type="number"
                        step="0.01"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Gastos"
                        value={expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                    />

                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Total a Recibir"
                        value={total2}
                        readOnly
                    />

                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Total a Recibir"
                        value={total3}
                        readOnly
                    />

                    <input
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                        placeholder="Saldo Pendiente"
                        value={balance}
                        readOnly
                    />


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