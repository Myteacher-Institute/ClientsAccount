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

        const isFormData = (typeof FormData !== 'undefined') && (data instanceof FormData);
        if (isFormData) {
            headers['Content-Type'] = 'multipart/form-data';
        }

        console.log('[API Request]', method.toUpperCase(), url, {
            data,
            headers,
            requiresAuth,
        });

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
        console.error('[API Error]', {
            url,
            method,
            message: error.message,
            data: error.config?.data,
            status: error.response?.status,
            headers: error.config?.headers,
            response: error.response?.data,
        });

        const msg = error?.response?.data?.message || error.message || 'Request failed';
        if (onErrorMessage) {
            toast.error(typeof onErrorMessage === 'string' ? onErrorMessage : msg);
        }

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
