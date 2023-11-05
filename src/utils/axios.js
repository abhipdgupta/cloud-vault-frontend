import axios from 'axios'
const token = localStorage.getItem('token')
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    Accept: 'application/json',
  },
})

export const auth_api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    authorization: `Bearer ${token}`,
  },
})
export const aws_put_api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
})

export default api
