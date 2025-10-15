import axios from './instance';
import endpoints from './endpoints';
import { toast } from '@/utils/toast';
import { getToken } from '@/auth/token';

const handleRequest = async (
    method,
    endpointKey,
    data = null,
    dynamicId = null,
    requiresAuth = true,
    { onErrorMessage = true, onSuccessMessage = false } = {}
) => {
    let url;
    try {
        const raw = endpoints[endpointKey];
        if (!raw) { throw new Error(`Invalid endpoint: ${endpointKey}`); }
        url = typeof raw === 'function' ? raw(dynamicId) : raw;

        const headers = {};
        if (requiresAuth) {
            const token = await getToken();
            if (!token) { throw new Error('Authentication required'); }
            headers.Authorization = `Bearer ${token}`;
        }

        if (data instanceof FormData) { headers['Content-Type'] = 'multipart/form-data'; }

        console.log(`[API Request] ${method.toUpperCase()} ${url}`, { data, headers });

        let response;
        switch (method) {
            case 'get':
                response = await axios.get(url, { headers });
                break;
            case 'post':
                response = await axios.post(url, data, { headers });
                break;
            case 'patch':
                response = await axios.patch(url, data, { headers });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        if (onSuccessMessage) {
            const msg = typeof onSuccessMessage === 'string'
                ? onSuccessMessage
                : response.data?.message || 'Request successful';
            toast.success(msg);
        }

        console.log('[API Response]', response.status, response.data);
        return response.data;

    } catch (error) {
        const status = error.response?.status;
        const backendMessage = error.response?.data?.message;
        const msg = typeof onErrorMessage === 'string'
            ? onErrorMessage
            : backendMessage || error.message || 'Request failed';

        console.error('[API Error]', {
            url,
            data,
            method,
            status,
            message: backendMessage || error.message,
        });

        if (onErrorMessage) { toast.error(msg); }

        throw error;
    }
};

export const Get = (endpointKey, dynamicId = null, requiresAuth = true, options = {}) => {
    return handleRequest('get', endpointKey, null, dynamicId, requiresAuth, options);
};

export const Post = (endpointKey, data = {}, requiresAuth = false, options = {}) => {
    return handleRequest('post', endpointKey, data, null, requiresAuth, options);
};

export const Patch = (endpointKey, data = {}, dynamicId = null, requiresAuth = true, options = {}) => {
    return handleRequest('patch', endpointKey, data, dynamicId, requiresAuth, options);
};
