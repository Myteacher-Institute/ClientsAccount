import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.18.16:3000/api/v1/users/',
    timeout: 30000,
});

export default instance;
