// src/api/axios.js
import axios from 'axios'
import axiosRetry from 'axios-retry'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 20000, // wait up to 20 seconds
})

axiosRetry(api, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay,
})

export default api
