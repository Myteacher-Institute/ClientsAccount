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
    {
        onErrorMessage = true,
        onSuccessMessage = false,
    } = {}
) => {
    try {
        const raw = endpoints[endpointKey];
        if (!raw) { throw new Error(`Invalid endpoint: ${endpointKey}`); }

        const url = typeof raw === 'function' ? raw(dynamicId) : raw;

        const headers = {};
        if (requiresAuth) {
            const token = await getToken();
            if (!token) { throw new Error('Authentication required'); }
            headers.Authorization = `Bearer ${token}`;
        }

        const config = { headers };

        let response;
        switch (method) {
            case 'get':
                response = await axios.get(url, config);
                break;
            case 'post':
                response = await axios.post(url, data, config);
                break;
            case 'patch':
                response = await axios.patch(url, data, config);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        if (onSuccessMessage) {
            toast.success(onSuccessMessage);
        }

        return response.data;
    } catch (error) {
        const msg = error?.response?.data?.message || error.message || 'Request failed';

        if (onErrorMessage) {
            toast.error(typeof onErrorMessage === 'string' ? onErrorMessage : msg);
        }

        throw error;
    }
};

export const Get = (endpointKey, dynamicId = null, requiresAuth = true, options = {}) =>
    handleRequest('get', endpointKey, null, dynamicId, requiresAuth, options);

export const Post = (endpointKey, data = {}, requiresAuth = false, options = {}) =>
    handleRequest('post', endpointKey, data, null, requiresAuth, options);

export const Patch = (endpointKey, data = {}, dynamicId = null, requiresAuth = true, options = {}) =>
    handleRequest('patch', endpointKey, data, dynamicId, requiresAuth, options);
