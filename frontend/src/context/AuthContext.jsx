// import { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

// const AuthContext = createContext();

// // ✅ EXPORT NAMED 'useAuth'
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded.exp * 1000 < Date.now()) { logout(); }
//         else { fetchProfile(token); }
//       } catch (e) { logout(); }
//     } else { setLoading(false); }
//   }, []);

//   const fetchProfile = async (token) => {
//     try {
//       const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUser(data);
//     } catch (e) { logout(); }
//     finally { setLoading(false); }
//   };

//   const login = async (email, password) => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       localStorage.setItem('token', data.token);
//       setUser(data.user || data);
//       return { success: true };
//     } catch (err) {
//       return { success: false, error: err.response?.data?.message || 'Login failed' };
//     }
//   };

//   const register = async (name, email, password) => {
//     try {
//       const { data } = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
//       localStorage.setItem('token', data.token);
//       setUser(data.user || data);
//       return { success: true };
//     } catch (err) {
//       return { success: false, error: err.response?.data?.message || 'Registration failed' };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     window.location.href = '/';
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

// Backend URL setting (Netlify environment variable se uthayega)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) { logout(); }
        else { fetchProfile(token); }
      } catch (e) { logout(); }
    } else { setLoading(false); }
  }, []);

  const fetchProfile = async (token) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data);
    } catch (e) { logout(); }
    finally { setLoading(false); }
  };

  const login = async (email, password) => {
    try {
      // ✅ FIXED: Using API_BASE_URL instead of localhost
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user || data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // ✅ FIXED: Using API_BASE_URL instead of localhost
      const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user || data);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 