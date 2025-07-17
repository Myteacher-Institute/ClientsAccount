import EncryptedStorage from 'react-native-encrypted-storage';

export const getToken = async () => {
    try {
        const token = await EncryptedStorage.getItem('auth_token');
        console.log('[EncryptedStorage] getToken returned:', token);
        return token;
    } catch (error) {
        console.error('[EncryptedStorage] Error getting token:', error);
        return null;
    }
};

export const setToken = async (token) => {
    try {
        await EncryptedStorage.setItem('auth_token', token);
        console.log('[EncryptedStorage] setToken stored:', token);
    } catch (error) {
        console.error('[EncryptedStorage] Error saving token:', error);
    }
};

export const clearToken = async () => {
    try {
        await EncryptedStorage.removeItem('auth_token');
        console.log('[EncryptedStorage] Token cleared.');
    } catch (error) {
        console.error('[EncryptedStorage] Error clearing token:', error);
    }
};
