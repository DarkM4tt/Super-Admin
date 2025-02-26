/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const checkAuth = async () => {
    setAuthLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/organizations/super-admin/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await res?.json();
      console.log("SESSION: ", data?.success);
      setIsAuthenticated(data?.success);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, checkAuth, authLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
