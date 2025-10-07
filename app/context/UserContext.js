import { Get } from '@/api';
import { jwtDecode } from 'jwt-decode';
import { getToken, clearToken } from '@/auth/token';
import { useState, useEffect, useContext, createContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [topUps, setTopUps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[UserContext] App mounted. Checking for token...');
    fetchUser();
  }, []);

  const fetchUser = async (tokenOverride = null) => {
    console.log('[UserContext] fetchUser() started');

    try {
      setLoading(true);

      const token = tokenOverride || (await getToken());
      if (!token) {
        console.warn('[UserContext] No token found.');
        setUser(null);
        return;
      }

      const decoded = jwtDecode(token);
      console.log('[UserContext] Decoded token:', decoded);

      const exp = Number(decoded?.exp) * 1000;
      const isExpired = exp && exp < Date.now();
      console.log('[UserContext] Expiry check:', exp, 'vs', Date.now(), 'Expired?', isExpired);

      if (isExpired) {
        console.warn('[UserContext] Token is expired. Clearing token...');
        await clearToken();
        setUser(null);
        return;
      }

      const userId = decoded?.userId;
      if (!userId) {
        throw new Error('userId not found in token');
      }

      const data = await Get('userProfile', userId, true); // true = auth required
      if (!data?.user) {
        throw new Error('Invalid user response from backend');
      }

      console.log('[UserContext] Fetched user:', data.user);
      setUser(data.user);
      setTopUps(data.user.wallet.topUps || []);
    } catch (err) {
      console.error('[UserContext] fetchUser error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, topUps, setUser, setTopUps, fetchUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
