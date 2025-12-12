import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/api'
// admin1/adminpass1


export default function Login() {
    const [u, setU] = useState('')
    const [p, setP] = useState('')
    const [err, setErr] = useState('')
    const nav = useNavigate()


    async function submit(e) {
        e.preventDefault();
        try {
            const r = await login(u, p);
            localStorage.setItem('token', r.token);
            nav('/');
        } catch (e) { setErr('Credenciales inválidas') }
    }


    return (
        <div className="p-8 max-w-md mx-auto">
            <div className='bg-white shadow-lg p-6 rounded-xl border border-gray-200'>
                <h1 className="text-2xl mb-4">Iniciar sesión (Admin)</h1>
                <form onSubmit={submit} className="space-y-3">
                    <input className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" value={u} onChange={e => setU(e.target.value)} placeholder="Usuario" />
                    <input className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none shadow-sm" type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Contraseña" />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow">Entrar</button>
                </form>
                {err && <p className="text-red-600 mt-2">{err}</p>}
            </div>
        </div>
    )
}