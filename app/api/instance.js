import axios from 'axios';

const instance = axios.create({ baseURL: 'http://192.168.0.102:3000/api/v1' });

instance.interceptors.request.use(req => {
    console.log('[AXIOS REQUEST]', req.method.toUpperCase(), req.url, req.data);
    return req;
});

instance.interceptors.response.use(
    res => {
        console.log('[AXIOS RESPONSE]', res.status, res.config.url, res.data);
        return res;
    },
    err => {
        console.log('[AXIOS ERROR]', err.config?.url, err.message);
        return Promise.reject(err);
    }
);

export default instance;
