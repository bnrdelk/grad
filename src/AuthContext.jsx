import { createContext, useState, useEffect } from 'react';
import axios from '../src/axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchCurrentUser();
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
      setLoading(false);
    }
  }, [token]);

  const saveToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsLoggedIn(true);
  };

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    window.location.reload();
    console.log(currentUser)
    setIsLoggedIn(false);
  };

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/user/current'); 
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error:", error);
      clearToken(); 
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    setCurrentUser,
    token,
    saveToken,
    clearToken,
    isLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};