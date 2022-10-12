import axios from 'axios'
export const BACKEND_BASE_URL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:4200'

// console.log('BACKEND_BASE_URL:', BACKEND_BASE_URL)

// axios.defaults.headers.common['User-Agent'] = 'localtunnel'

axios.interceptors.request.use((config) => {
  config.headers['User-Agent'] = 'localtunnel'
  //   config.headers['Bypass-Tunnel-Reminder'] = 'true'
  return config
})
