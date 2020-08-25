import axios from 'axios';

const api = axios.create({
  baseURL: 'https://wytboard.io/',
});

export default api;
