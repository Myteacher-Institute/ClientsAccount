import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.1.244:3000/api/v1/',
    timeout: 30000,
});

export default instance;
