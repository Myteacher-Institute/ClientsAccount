import { Get } from '@/api';
import { jwtDecode } from 'jwt-decode';
import { getToken } from '@/auth/token';
import { useState, useEffect, useContext, createContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('[UserContext] useEffect triggered');
        fetchUser();
    }, []);

    const fetchUser = async () => {
        console.log('[UserContext] fetchUser() started');
        try {
            setLoading(true);
            const token = await getToken();
            console.log('[UserContext] getToken returned:', token);

            if (!token) {
                console.warn('[UserContext] No token found.');
                return;
            }

            const decoded = jwtDecode(token); // can throw
            console.log('[UserContext] Decoded token:', decoded);

            const userId = decoded?.userId;
            if (!userId) { throw new Error('userId not found in token'); }

            const data = await Get('userProfile', userId, true);
            console.log('[UserContext] Fetched user:', data);

            setUser(data.user);
        } catch (err) {
            console.error('[UserContext] fetchUser error:', err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
