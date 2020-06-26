import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.21:4444' // IP da maquina ao inves de localhost
});

export default api;