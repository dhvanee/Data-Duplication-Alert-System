import { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../lib/queryClient';
import { useToast } from '../hooks/use-toast';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const res = await fetch('/api/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            credentials: 'include'
          });
          
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          } else {
            // Token is invalid, remove it
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      setIsLoading(true);
      const res = await apiRequest('POST', '/api/auth/login', { username, password });
      const data = await res.json();
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${data.user.username}!`,
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username, password, firstName, lastName, email) => {
    try {
      setIsLoading(true);
      const res = await apiRequest('POST', '/api/auth/register', { 
        username, 
        password,
        firstName,
        lastName,
        email
      });
      const data = await res.json();
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${data.user.username}!`,
      });
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      register, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};