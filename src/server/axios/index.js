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


export { securedAxiosInstance, plainAxiosInstance, imageAxiosInstance }
