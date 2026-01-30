import { useCallback } from 'react';
import { AuthService } from '../services/authService';

interface User {
  id: number;
  username: string;
  role: string;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = React.useState<User | null>(AuthService.getUser());
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await AuthService.login(username, password);
      setUser(response.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    
    try {
      await AuthService.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await AuthService.changePassword(oldPassword, newPassword, confirmPassword);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Change password failed';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    isAuthenticated: AuthService.isAuthenticated(),
    loading,
    error,
    login,
    logout,
    changePassword,
    clearError
  };
};
