// request.js
import axios from './instance';
import endpoints from './endpoints';
import { toast } from '@/utils/toast';
import { getToken } from '@/auth/token';

// 🧠 Debug toggle
const DEBUG_MODE = true;
const log = (label, data, color = '#9e9e9e') => {
    if (DEBUG_MODE) {
        console.log(`%c${label}`, `color:${color}; font-weight:bold;`, data);
    }
};

/**
 * 🧩 Core API handler
 * Safe, object-based interface for all HTTP methods.
 */
const handleRequest = async ({
    method,
    endpointKey,
    data = null,
    dynamicId = null,
    requiresAuth = true,
    options: {
        onErrorMessage = true,
        onSuccessMessage = false,
    } = {},
}) => {
    const groupLabel = `[API] ${method.toUpperCase()} → ${endpointKey}`;
    DEBUG_MODE && console.groupCollapsed(`%c${groupLabel}`, 'color:#00bcd4; font-weight:bold;');

    console.log('[handleRequest args]', { method, endpointKey, data, dynamicId, requiresAuth });
    try {
        // 1️⃣ Resolve endpoint
        const rawEndpoint = endpoints[endpointKey];
        if (!rawEndpoint) { throw new Error(`Invalid endpoint key: ${endpointKey}`); }
        const url = typeof rawEndpoint === 'function' ? rawEndpoint(dynamicId) : rawEndpoint;
        log('🌍 Resolved Endpoint', { endpointKey, dynamicId, finalUrl: url }, '#03a9f4');

        // 2️⃣ Auth header setup
        const headers = {};
        if (requiresAuth) {
            const token = await getToken();
            if (!token) { throw new Error('Authentication required (no token found)'); }
            headers.Authorization = `Bearer ${token}`;
            log('🔐 Token Attached', token.slice(0, 20) + '...', '#9c27b0');
        }

        // 3️⃣ Handle data formatting
        const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
        if (isFormData) {
            headers['Content-Type'] = 'multipart/form-data';
        } else {
            headers['Content-Type'] = 'application/json';
            headers.Accept = 'application/json';
        }

        // 4️⃣ Final request config
        const config = { headers };
        log('📤 Request Config', { method, url, headers, data }, '#2196f3');

        // 5️⃣ Execute request
        let response;
        switch (method) {
            case 'get':
                response = await axios.get(url, config);
                break;
            case 'post':
                const cleanData =
                    data && typeof data === 'object'
                        ? Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined && v !== null))
                        : data;
                log('🧹 Sanitized Data', cleanData, '#8bc34a');
                response = await axios.post(url, cleanData, config);
                break;
            case 'patch':
                response = await axios.patch(url, data, config);
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        // 6️⃣ Handle success
        log('✅ SUCCESS', { status: response.status, data: response.data }, '#4caf50');
        if (onSuccessMessage) {
            const msg =
                typeof onSuccessMessage === 'string'
                    ? onSuccessMessage
                    : response.data?.message || 'Request successful';
            toast.success(msg);
        }

        DEBUG_MODE && console.groupEnd();
        return response.data;

    } catch (error) {
        // 🛑 Error handling
        const backendMessage = error.response?.data?.message;
        const status = error.response?.status;

        log('❌ ERROR', {
            method,
            url: error.config?.url,
            status,
            backendMessage,
            message: error.message,
            responseData: error.response?.data,
        }, '#f44336');

        const msg =
            typeof onErrorMessage === 'string'
                ? onErrorMessage
                : backendMessage || error.message || 'Request failed';

        if (onErrorMessage) { toast.error(msg); }

        DEBUG_MODE && console.groupEnd();
        throw error;
    }
};

// ───────────────────────────────────────────────
// 🔹 EXPORTED METHODS (object-based, safe)
// ───────────────────────────────────────────────

export const Get = ({ endpointKey, dynamicId = null, requiresAuth = true, options = {} }) =>
    handleRequest({ method: 'get', endpointKey, dynamicId, requiresAuth, options });

export const Post = ({ endpointKey, data = {}, dynamicId = null, requiresAuth = false, options = {} }) =>
    handleRequest({ method: 'post', endpointKey, data, dynamicId, requiresAuth, options });

export const Patch = ({ endpointKey, data = {}, dynamicId = null, requiresAuth = true, options = {} }) =>
    handleRequest({ method: 'patch', endpointKey, data, dynamicId, requiresAuth, options });
