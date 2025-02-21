// src/context/GlobalStateContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const GlobalStateContext = createContext();

// Provider component
export const GlobalStateProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  // Example: persist auth state from localStorage
  useEffect(() => {
    const storedAuth = JSON.parse(localStorage.getItem('auth'));
    if (storedAuth && storedAuth.token) {
      setAuth(storedAuth);
    }
  }, []);

  const login = (data) => {
    setAuth({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    });
    localStorage.setItem('auth', JSON.stringify(data));
  };

  const logout = () => {
    setAuth({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('auth');
  };

  return (
    <GlobalStateContext.Provider value={{ auth, login, logout }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalState = () => useContext(GlobalStateContext);
