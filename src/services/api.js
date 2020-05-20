import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.0.15:5000/'

axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

axios.interceptors.request.use(
  (config) => {
    return { ...config, headers: { 'Content-Type': 'application/json' } }
  },

  (error) => {
    const { status } = error.response

    if (status === 401) {
      localStorage.clear()
      window.location = '/'
    }
    return Promise.reject(error)
  }
)

const api = axios

export default api
