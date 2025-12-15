import axios from 'axios';
const API = (import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : 'https://backendhdh.onrender.com/api';


export async function login(username, password){
const res = await axios.post(`${API}/auth/login`, { username, password });
return res.data;
}


export function authHeaders(){
const token = localStorage.getItem('token');
return { Authorization: `Bearer ${token}` };
}


export async function listVendors(){
const res = await axios.get(`${API}/admins/vendors`, { headers: authHeaders() });
return res.data;
}


export async function createVendor(payload){
const res = await axios.post(`${API}/admins/vendors`, payload, { headers: authHeaders() });
return res.data;
}


export async function createSale(payload){
const res = await axios.post(`${API}/admins/sales`, payload, { headers: authHeaders() });
return res.data;
}


export async function weeklyReport(startDate, endDate, vendor_id) {
    const res = await axios.post(
        `${API}/reports/weekly`,
        { startDate, endDate, vendor_id }, // enviamos el ID opcional
        { headers: authHeaders() }
    );
    return res.data;
}


