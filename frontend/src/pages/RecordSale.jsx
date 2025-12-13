import React, { useState, useEffect } from 'react'
import { listVendors, createSale } from '../services/api'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header';

export default function RecordSale() {
    const [vendors, setVendors] = useState([])
    const [vendorId, setVendorId] = useState('')
    const [date, setDate] = useState('')
    const [quantity1, setQuantity1] = useState('')
    const [leftovers, setLeftovers] = useState('')
    const [quantity2, setQuantity2] = useState('')
    const [price, setPrice] = useState('')
    const [total1, setTotal1] = useState('')
    const [expenses, setExpenses] = useState('')
    const [bills, setBills] = useState('')
    const [coins, setCoins] = useState('')
    const [total2, setTotal2] = useState('')
    const [total3, setTotal3] = useState('')
    const [balance, setBalance] = useState('')
    const [msg, setMsg] = useState('')

    const nav = useNavigate()

    useEffect(() => {
        listVendors().then(setVendors).catch(() => setMsg('Error cargando vendedores'))
    }, [])

    useEffect(() => {
        setQuantity2((parseInt(quantity1) || 0) - (parseInt(leftovers) || 0))
    }, [quantity1, leftovers])

    useEffect(() => {
        setTotal1((parseInt(quantity2) || 0) * (parseFloat(price) || 0))
    }, [quantity2, price])

    useEffect(() => {
        setTotal2((parseFloat(total1) || 0) - (parseFloat(expenses) || 0))
    }, [total1, expenses])

    useEffect(() => {
        setTotal3((parseFloat(bills) || 0) + (parseFloat(coins) || 0))
    }, [bills, coins])

    useEffect(() => {
        setBalance((parseFloat(total2) || 0) - (parseFloat(total3) || 0))
    }, [total2, total3])

    async function submit(e) {
        e.preventDefault()
        try {
            await createSale({
                vendor_id: vendorId,
                date,
                quantity_delivered: quantity1,
                leftovers,
                quantity_sold: quantity2,
                price_per_unit: price,
                total_sold: total1,
                expenses,
                bills,
                coins,
                total_to_deliver: total2,
                total_delivered: total3,
                remaining_balance: balance
            })
            setMsg('Venta registrada correctamente')
        } catch (e) {
            setMsg('Error al registrar venta')
        }
    }

    const Field = ({ label, children }) => (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold">{label}</label>
            {children}
        </div>
    )

    const inputClass =
        'p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <Header /> {/* Aquí van los logos */}
            <div className="bg-white p-6 rounded-xl shadow border">
                <h1 className="text-xl font-bold mb-4">Registrar Venta</h1>

                <form onSubmit={submit} className="grid grid-cols-2 gap-6">

                    {/* ================= COLUMNA IZQUIERDA ================= */}
                    <div className="flex flex-col gap-4">

                        <Field label="Vendedor">
                            <select className={inputClass} value={vendorId} onChange={e => setVendorId(e.target.value)}>
                                <option value="">Selecciona vendedor</option>
                                {vendors.map(v => (
                                    <option key={v.id} value={v.id}>{v.name}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Fecha">
                            <input type="date" className={inputClass} value={date} onChange={e => setDate(e.target.value)} />
                        </Field>

                        <Field label="Cantidad Entregada">
                            <input type="number" className={inputClass} value={quantity1} onChange={e => setQuantity1(e.target.value)} />
                        </Field>

                        <Field label="Sobrantes">
                            <input type="number" className={inputClass} value={leftovers} onChange={e => setLeftovers(e.target.value)} />
                        </Field>

                        <Field label="Cantidad Vendida (calculada)">
                            <input className={inputClass} value={quantity2} readOnly />
                        </Field>

                        <Field label="Precio Unitario">
                            <input type="number" step="0.01" className={inputClass} value={price} onChange={e => setPrice(e.target.value)} />
                        </Field>

                        <Field label="Total Ventas (calculado)">
                            <input className={inputClass} value={total1} readOnly />
                        </Field>

                    </div>

                    {/* ================= COLUMNA DERECHA ================= */}
                    <div className="flex flex-col gap-4">

                        <Field label="Gastos">
                            <input type="number" step="0.01" className={inputClass} value={expenses} onChange={e => setExpenses(e.target.value)} />
                        </Field>

                        <Field label="Total a Recibir (calculado)">
                            <input className={inputClass} value={total2} readOnly />
                        </Field>

                        <Field label="Billetes">
                            <input type="number" step="0.01" className={inputClass} value={bills} onChange={e => setBills(e.target.value)} />
                        </Field>

                        <Field label="Monedas">
                            <input type="number" step="0.01" className={inputClass} value={coins} onChange={e => setCoins(e.target.value)} />
                        </Field>

                        <Field label="Total Entregado (calculado)">
                            <input className={inputClass} value={total3} readOnly />
                        </Field>

                        <Field label="Saldo Pendiente (calculado)">
                            <input className={inputClass} value={balance} readOnly />
                        </Field>

                    </div>

                    {/* ================= BOTONES ================= */}
                    <div className="col-span-2 flex justify-center gap-4 mt-6">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={() => nav('/')}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold"
                        >
                            Volver
                        </button>
                    </div>

                </form>


                {msg && <p className="mt-3 font-semibold">{msg}</p>}
            </div>
        </div>
    )
}
