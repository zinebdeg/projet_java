import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification au démarrage
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await api.authenticate(username, password);

      // Sauvegarder les données
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Nom d\'utilisateur ou mot de passe incorrect'
      };
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await api.register(userData);

      // Après inscription, on peut auto-login
      if (userData.password) {
        const loginResult = await login(userData.username, userData.password);
        return loginResult;
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);

      let errorMessage = error.message;
      if (error.message.includes('400') || error.message.includes('déjà utilisé')) {
        errorMessage = 'Nom d\'utilisateur ou email déjà utilisé, ou informations invalides.';
      } else if (error.message.includes('Failed to fetch') || error.message.includes('0')) {
        errorMessage = 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré.';
      }

      return {
        success: false,
        error: errorMessage || 'Erreur lors de l\'inscription. Vérifiez vos informations.'
      };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};