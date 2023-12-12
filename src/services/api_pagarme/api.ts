import axios from "axios";

const username = 'sk_0692c1a5e435486791fc4d3b45ec9748:' //process.env.DATABASE_PAGARME pk_test_k93KEYacvlH60Km6
console.log(username)
const password = ''

const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

const api = axios.create({
    baseURL: 'https://api.pagar.me/core/v5',
    timeout: 5000,
    headers: { Authorization: `Basic ${token}`}
})

export default api;