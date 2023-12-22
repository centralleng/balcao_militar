import axios from "axios";

const token = process.env.DATABASE_ASAAS

const api = axios.create({
    baseURL: 'https://sandbox.asaas.com/api/v3/',
    // baseURL: 'https://sandbox.asaas.com/api/v3/',
    timeout: 5000,
   headers: {
    accept: 'application/json',
    access_token: '$aact_YTU5YTE0M2M2N2I4MTliNzk0YTI5N2U5MzdjNWZmNDQ6OjAwMDAwMDAwMDAwMDAwNzA0MDE6OiRhYWNoXzQ2YTEzMDBjLTlhNTAtNDRkZC1hM2Y4LWJkOGJlMDk5OTgwZQ=='
  }
})

export default api;