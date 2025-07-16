import EncryptedStorage from 'react-native-encrypted-storage';

export const getToken = async () => {
    try {
        const token = await EncryptedStorage.getItem('auth_token');
        return token;
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const setToken = async (token) => {
    try {
        await EncryptedStorage.setItem('auth_token', token);
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const removeToken = async () => {
    try {
        await EncryptedStorage.removeItem('auth_token');
    } catch (error) {
        console.error('Error removing token:', error);
    }
};
