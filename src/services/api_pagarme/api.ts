import axios from "axios";

const username = process.env.DATABASE_PAGARME
const password = ''

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

const api = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    timeout: 5000,
    headers: { Authorization: `Basic ${token}`}
})

export default api;