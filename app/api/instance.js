import axios from 'axios';
import { clearToken } from '@/auth/token';
import { toast } from '@/utils/toast';

// ✅ Base URL
const instance = axios.create({
    baseURL: 'http://192.168.18.13:3000/api/v1',
    timeout: 10000,
});

// 🟢 Log all requests for debugging
instance.interceptors.request.use(req => {
    console.log('[AXIOS REQUEST]', req.method?.toUpperCase(), req.url, req.data || '');
    return req;
});

// 🟢 Handle responses + reactive logout
instance.interceptors.response.use(
    res => {
        console.log('[AXIOS RESPONSE]', res.status, res.config.url, res.data);
        return res;
    },
    async err => {
        const status = err.response?.status;
        const message = err.response?.data?.message;
        const url = err.config?.url;

        console.warn('[AXIOS ERROR]', { url, status, message });

        // 🔴 If backend explicitly says token invalid or expired → logout gracefully
        if (status === 403 && message?.toLowerCase().includes('invalid token')) {
            console.log('[Auth] ❌ Token rejected by backend → clearing');
            await clearToken();
            toast.error('Session expired. Please sign in again.');
            // AppNavigator will react to cleared token automatically
        }

        return Promise.reject(err);
    }
);

export default instance;
