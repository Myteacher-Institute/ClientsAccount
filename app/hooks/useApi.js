import {useState} from 'react';
import {Get, Post, Patch, FetchPost} from '@/api';

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
    try {
      setLoading(true);
      let response;
      const options = {onSuccessMessage, onErrorMessage};
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
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {loading, call: callApi};
};
