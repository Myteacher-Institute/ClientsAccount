import { useState } from 'react';
import { Get, Post, Patch, FetchPost } from '@/api';

export const useApi = (method = 'post') => {
  const [loading, setLoading] = useState(false);

  const callApi = async ({
    data,
    endpoint,
    dynamicId,
    requiresAuth = true,
    onErrorMessage = true,
    onSuccessMessage = null,
  }) => {
    console.log('[useApi] 🔵 callApi invoked', { method, endpoint, dynamicId });

    try {
      setLoading(true);

      if (data && typeof data === 'object' && !(data instanceof FormData)) {
        console.log('[useApi] Checking object for files...');
        const hasFile = Object.values(data).some(v => v?.uri && (v?.name || v?.fileName));
        console.log('[useApi] hasFile:', hasFile);

        if (hasFile) {
          console.log('[useApi] 📦 Converting to FormData...');
          const formData = new FormData();
          for (const key in data) {
            const val = data[key];
            if (val?.uri && (val?.name || val?.fileName)) {
              console.log(`[useApi] Appending file field: ${key}`, val);
              formData.append(key, {
                uri: val.uri,
                name: val.name || val.fileName,
                type: val.type || 'image/jpeg',
              });
            } else {
              console.log(`[useApi] Appending normal field: ${key}`, val);
              formData.append(key, val);
            }
          }
          data = formData;
        }
      }

      console.log('[useApi] Final data type:', data instanceof FormData ? 'FormData' : typeof data);

      let response;
      const options = { onSuccessMessage, onErrorMessage };

      switch (method) {
        case 'get':
          response = await Get(endpoint, dynamicId, requiresAuth, options);
          break;
        case 'patch':
          response = await Patch(
            endpoint,
            data,
            dynamicId,
            requiresAuth,
            options,
          );
          break;
        case 'fetchpost':
          response = await FetchPost(
            endpoint,
            data,
            dynamicId,
            requiresAuth,
            options,
          );
          break;
        case 'post':
        default:
          response = await Post(endpoint, data, requiresAuth, options);
          break;
      }

      console.log('[useApi] ✅ API call success:', response);
      return response;

    } catch (err) {
      console.error('[useApi] ❌ API call error:', err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, call: callApi };
};
