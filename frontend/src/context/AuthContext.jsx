import { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
export const AuthContext = createContext(null);

// Create the Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to fetch user status on mount (verify cookie token)
  const checkUserSession = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/me', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user); // data.user contains { id, name, email } (or whatever structure the backend /me sends)
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Session verification failed:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      setError(null);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      // Successful login
      setUser(data.user);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Sign Up handler
  const signup = async (name, email, password) => {
    try {
      setError(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Sign Up failed. Please try again.');
      }

      // Successful signup
      // Note: backend signup controller returns { message, token, newUser }
      // We map newUser to user state (newUser contains user_id, name, email)
      setUser({
        user_id: data.newUser.user_id,
        name: data.newUser.name,
        email: data.newUser.email
      });
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout handler
  const logout = async () => {
    try {
      setError(null);
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (res.ok) {
        setUser(null);
        return { success: true };
      } else {
        const data = await res.json();
        throw new Error(data.message || 'Logout failed.');
      }
    } catch (err) {
      console.error('Logout error:', err);
      // Even if API fails, clear client-side state as fallback
      setUser(null);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    checkUserSession,
    setError
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

// Custom Hook to consume the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
