import React, { useState } from 'react'
import { createVendor } from '../services/api'
import { useNavigate } from 'react-router-dom'


export default function RegisterVendor() {
    const [name, setName] = useState('')
    const [notes, setNotes] = useState('')
    const [msg, setMsg] = useState('')
    const nav = useNavigate()


    async function submit(e) {
        e.preventDefault();
        try {
            await createVendor({ name, notes });
            setMsg('Vendedor creado');
            setName(''); setNotes('');
        } catch (e) { setMsg('Error: ' + (e?.response?.data?.message || e.message)); }
    }


    return (
        <div className="p-8 max-w-md mx-auto">
            <div className='bg-white shadow-lg p-6 rounded-xl border border-gray-200'>
            <h1 className="text-xl mb-4">Registrar Vendedor</h1>
            <form onSubmit={submit} className="space-y-3">
                <input className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
                <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Notas (opcional)" />
                <div className="flex space-x-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Crear</button>
                    <button type="button" onClick={() => nav('/')} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Volver</button>
                </div>
            </form>
            {msg && <p className="mt-2">{msg}</p>}
            </div>
        </div>
    )
}