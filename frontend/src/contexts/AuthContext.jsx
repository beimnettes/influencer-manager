// import React, { createContext, useState, useContext, useEffect, useMemo,} from 'react';
// import { authAPI } from '../services/api';

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isAuthenticated, setIsAuthenticated] = useState(false);

//     useEffect(() => {
//         // Check if user is already logged in
//         const token = localStorage.getItem('token');
//         const savedUser = localStorage.getItem('user');

//         if (token && savedUser) {
//             setUser(JSON.parse(savedUser));
//             setIsAuthenticated(true);
//         }
//         setLoading(false);
//     }, []);
// //     useEffect(() => {
// //     const initAuth = async () => {
// //       const token = localStorage.getItem('token');
// //       const savedUser = localStorage.getItem('user');

// //       if (!token || !savedUser) {
// //         setLoading(false);
// //         return;
// //       }
// //        try {
// //         // 🔥 validate token with backend
// //         const me = await authAPI.me(); // GET /auth/me
// //         setUser(me);
// //         setIsAuthenticated(true);
// //         localStorage.setItem('user', JSON.stringify(me));
// //       } catch (error) {
// //         // token invalid / expired
// //         localStorage.removeItem('token');
// //         localStorage.removeItem('user');
// //         setUser(null);
// //         setIsAuthenticated(false);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     initAuth();
// //   }, []);
//     const login = async (email, password) => {
//         setLoading(true);
//         try {
//             const data = await authAPI.login({ email, password });
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('user', JSON.stringify(data.user));
//             setUser(data.user);
//             setIsAuthenticated(true);
//             return { success: true };
//         } catch (error) {
//             return {
//                 success: false,
//                 error: error.response?.data?.message || 'Login failed',
//             };
//         }
//         finally{
//             setLoading(false);
//         }
//     };

//     const signup = async (name, email, password) => {
//         setLoading(true);
//         try {
//             const data = await authAPI.signup({ name, email, password });
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('user', JSON.stringify(data.user));
//             setUser(data.user);
//             setIsAuthenticated(true);
//             return { success: true };
//         } catch (error) {
//             return {
//                 success: false,
//                 error: error.response?.data?.message || 'Signup failed',
//             };
//         }
//         finally{
//             setLoading(false);
//         }
//     };

//     const updateProfile = async (userData) => {
//         // In a real app, this would call an API
//         // For now, we'll update local state and storage
//         try {
//             const updatedUser = { ...user, ...userData };
//             setUser(updatedUser);
//             localStorage.setItem('user', JSON.stringify(updatedUser));
//             return { success: true };
//         } catch (error) {
//             return {
//                 success: false,
//                 error: error.message || 'Update failed'
//             };
//         }
//     };

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         setUser(null);
//         setIsAuthenticated(false);
//     };
//     if (loading) {
//         return null;
//     }

//     // return (
//     //     <AuthContext.Provider
//     //         value={{
//     //             user,
//     //             loading,
//     //             isAuthenticated,
//     //             // login,
//     //             // signup,
//     //             login,
//     //             signup,
//     //             logout,
//     //             updateProfile,
//     //         }}
//     //     >
//     //         {children}
//     //     </AuthContext.Provider>
//     // );
//      const value = useMemo(
//     () => ({
//       user,
//       loading,
//       isAuthenticated,
//       login,
//       signup,
//       logout,
//       updateProfile,
//     }),
//     [user, loading, isAuthenticated]
//   );

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error('useAuth must be used within AuthProvider');
//     }
//     return context;
// };

// export default AuthContext;


import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 🔹 1️⃣ Fast init from localStorage (instant UI response)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  // 🔹 2️⃣ Validate token with backend (real auth state)
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const me = await authAPI.me(); // GET /auth/me
        setUser(me);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(me));
      } catch (error) {
        // token expired / invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔹 Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authAPI.login({ email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Signup
  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authAPI.signup({ name, email, password });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setUser(data.user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed',
      };
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Update profile (local only for now)
  const updateProfile = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Update failed',
      };
    }
  };

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  // 🔹 Memoized context value
  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      login,
      signup,
      logout,
      updateProfile,
    }),
    [user, loading, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
