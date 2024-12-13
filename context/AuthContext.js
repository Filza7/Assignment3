import { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Create a custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// Create an AuthProvider component to wrap the app with authentication context
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    // Dummy login function to authenticate
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Dummy logout function to reset authentication
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
