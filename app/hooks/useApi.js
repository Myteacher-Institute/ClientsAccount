import { useState } from 'react';
import { Get, Post, Patch } from '@/api';

/**
 * useApi Hook (Bulletproof)
 * - Provides get, post, patch methods with safe object-based parameters
 * - Handles FormData conversion
 * - Automatically logs detailed request info
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false);

  /**
   * 🔹 Internal handler for all request types
   */
  const handleApiCall = async (method, {
    endpoint,
    data = null,
    dynamicId = null,
    requiresAuth = true,
    onErrorMessage = true,
    onSuccessMessage = null,
  }) => {
    console.log(`[useApi] 🔵 ${method.toUpperCase()} called`, { endpoint, dynamicId });

    try {
      setLoading(true);

      // 🧩 Convert to FormData if needed
      if (data && typeof data === 'object' && !(data instanceof FormData)) {
        const hasFile = Object.values(data).some(v => v?.uri && (v?.name || v?.fileName));
        if (hasFile) {
          console.log('[useApi] 📦 Converting to FormData...');
          const formData = new FormData();
          for (const key in data) {
            const val = data[key];
            if (val?.uri && (val?.name || val?.fileName)) {
              formData.append(key, {
                uri: val.uri,
                name: val.name || val.fileName,
                type: val.type || 'image/jpeg',
              });
            } else {
              formData.append(key, val);
            }
          }
          data = formData;
        }
      }

      const options = { onSuccessMessage, onErrorMessage };
      console.log('[useApi] ⚙️ Final Data Type:', data instanceof FormData ? 'FormData' : typeof data);

      // 🔧 Route to correct request function
      let response;
      switch (method) {
        case 'get':
          response = await Get({ endpointKey: endpoint, dynamicId, requiresAuth, options });
          break;
        case 'patch':
          response = await Patch({ endpointKey: endpoint, data, dynamicId, requiresAuth, options });
          break;
        case 'post':
          response = await Post({ endpointKey: endpoint, data, dynamicId, requiresAuth, options });
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      console.log('[useApi] ✅ Success', {
        method,
        endpoint,
        dynamicId,
        status: response?.status,
        data: response?.data || response,
      });

      return response;
    } catch (err) {
      console.error('[useApi] ❌ Error:', err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Public API (object-based, position-safe)
  return {
    loading,
    get: (params) => handleApiCall('get', params),
    post: (params) => handleApiCall('post', params),
    patch: (params) => handleApiCall('patch', params),
  };
};
