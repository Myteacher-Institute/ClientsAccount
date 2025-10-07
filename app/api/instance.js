import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.179.43.170:3000/api/v1/',
  timeout: 30000,
});

export default instance;
