import axios from 'axios'
import { store } from '../../store/index'
const API_URL = 'http://ohl.api.localhost/' 

// to include Authorization token in every request
const securedAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': store.state.token
  }
})

// for login and signup only
const plainAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
})


// for image post
const imageAxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'image/*',
  }
})

securedAxiosInstance.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'Authorization': store.state.token
  }
  return config
})

imageAxiosInstance.interceptors.request.use(config => {
  config.headers = {
    ...config.headers,
    'Authorization': store.state.token
  }
  return config
})
//There are no refresh tokens in case of jwt-devise

// securedAxiosInstance.interceptors.response.use(null, error => {
//   if (error.response && error.response.config && error.response.status === 401) {
//     // In case 401 is caused by expired access cookie - we'll do refresh request
//     return plainAxiosInstance.post('/refresh', {}, { headers: { 'Authorization': localStorage.access } })
//       .then(response => {
//         localStorage.access = response.headers.authorization
//         localStorage.signedIn = true
//         // And after successful refresh - repeat the original request
//         let retryConfig = error.response.config
//         retryConfig.headers['Authorization'] = localStorage.access
//         return plainAxiosInstance.request(retryConfig)
//       }).catch(error => {
//         delete localStorage.access
//         delete localStorage.signedIn
//         // redirect to signin in case refresh request fails
//         location.replace('/')
//         return Promise.reject(error)
//       })
//   } else {
//     return Promise.reject(error)
//   }
// })


export { securedAxiosInstance, plainAxiosInstance, imageAxiosInstance }