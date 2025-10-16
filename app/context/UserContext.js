import { Get } from '@/api';
import { jwtDecode } from 'jwt-decode';
import { getToken, clearToken } from '@/auth/token';
import { useMemo, useState, useEffect, useContext, useCallback, createContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [topUps, setTopUps] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user from token and backend
  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) { return setUser(null); }

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch {
        await clearToken();
        return setUser(null);
      }

      const userId = decoded?.userId;
      if (!userId) {
        await clearToken();
        return setUser(null);
      }

      const data = await Get({
        dynamicId: userId,
        requiresAuth: true,
        endpointKey: 'userProfile',
      });

      if (data?.user) {
        setUser(data.user);
        setTopUps(data.user.wallet?.topUps || []);
      } else {
        await clearToken();
        setUser(null);
      }

      return data.user;
    } catch (err) {
      if (err.response?.status === 403) { await clearToken(); }
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Run once on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const contextValue = useMemo(
    () => ({ user, topUps, loading, setUser, setTopUps, fetchUser }),
    [user, topUps, loading, fetchUser]
  );

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
