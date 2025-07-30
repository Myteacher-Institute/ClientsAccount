import { useState } from 'react';
import { Get, Post, Patch } from '@/api';

export const useApi = (method = 'post') => {
    const [loading, setLoading] = useState(false);

    const callApi = async ({ data, endpoint, dynamicId, requiresAuth = true, onErrorMessage = true, onSuccessMessage = null }) => {
        try {
            setLoading(true);

            if (data && typeof data === 'object' && !(data instanceof FormData)) {
                const hasFile = Object.values(data).some(v => v?.uri && (v?.name || v?.fileName));
                if (hasFile) {
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

            let response;
            const options = { onSuccessMessage, onErrorMessage };

            switch (method) {
                case 'get':
                    response = await Get(endpoint, dynamicId, requiresAuth, options);
                    break;
                case 'patch':
                    response = await Patch(endpoint, data, dynamicId, requiresAuth, options);
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

    return { loading, call: callApi };
};
