import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 👈 BU SATIRI EKLE
})

// Request interceptor - ARTIK TOKEN KONTROLÜNE GEREK YOK
apiClient.interceptors.request.use(
  (config) => {
    // Cookie otomatik gideceği için token kontrolü kaldırıldı
    console.log('Making request to:', config.url);
    return config
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, redirect to login
      window.location.href = '/auth/login'
    }
    console.error('Response error:', error);
    return Promise.reject(error)
  }
)

export default apiClient
