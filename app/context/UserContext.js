import { Get } from '@/api';
import jwtDecode from 'jwt-decode';
import { getToken } from '@/auth/token';
import { useState, useEffect, useContext, createContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                return;
            }
            const decoded = jwtDecode(token);
            const userId = decoded?.id;
            if (!userId) { throw new Error('Invalid token: missing user ID'); }

            const data = await Get('userProfile', userId, true);
            setUser(data);
        } catch (err) {
            console.error('Failed to fetch user:', err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, fetchUser, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
