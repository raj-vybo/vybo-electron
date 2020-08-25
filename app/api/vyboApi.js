import axios from 'axios';

const vyboApi = axios.create({
  baseURL: 'https://wytboard.io/api/',
  // baseURL: 'http://localhost:8080/',
});

export default vyboApi;
