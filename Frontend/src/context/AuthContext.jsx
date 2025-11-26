import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react';
import { apiRequest } from '@/lib/api';

const STORAGE_KEY = 'college-app-auth';
const TOKEN_KEY = 'college-app-token';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const persistAuth = (nextUser, nextTokens) => {
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    if (nextTokens) {
      localStorage.setItem(TOKEN_KEY, JSON.stringify(nextTokens));
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const login = useCallback(async ({ email, password, role }) => {
    setStatus('loading');
    setError(null);
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: { email, password, role }
      });

      const nextUser = response.data.user;
      const nextTokens = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      };

      setUser(nextUser);
      setTokens(nextTokens);
      persistAuth(nextUser, nextTokens);
      setStatus('authenticated');
      return nextUser;
    } catch (err) {
      setError(err.message || 'Unable to login');
      setStatus('error');
      throw err;
    }
  }, []);

  const refreshSession = useCallback(async () => {
    if (!tokens?.refreshToken) return;
    try {
      const response = await apiRequest('/auth/refresh', {
        method: 'POST',
        body: { refreshToken: tokens.refreshToken }
      });
      const nextTokens = {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      };
      setTokens(nextTokens);
      persistAuth(user, nextTokens);
    } catch (err) {
      logout();
    }
  }, [tokens, user]);

  const logout = useCallback(async () => {
    try {
      if (tokens?.refreshToken) {
        await apiRequest('/auth/logout', {
          method: 'POST',
          body: { refreshToken: tokens.refreshToken }
        });
      }
    } catch (err) {
      // ignore network errors on logout
    } finally {
      setUser(null);
      setTokens(null);
      persistAuth(null, null);
      setStatus('idle');
    }
  }, [tokens]);

  useEffect(() => {
    if (!tokens?.accessToken) {
      setStatus('unauthenticated');
      return;
    }
    setStatus('authenticated');
  }, [tokens]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshSession();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshSession]);

  const value = useMemo(
    () => ({
      user,
      tokens,
      status,
      error,
      login,
      logout,
      refreshSession,
      setUser
    }),
    [user, tokens, status, error, login, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
