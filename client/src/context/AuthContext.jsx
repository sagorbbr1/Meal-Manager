import { createContext, useContext, useEffect, useState } from "react";
import API from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await API.get("/auth/user", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error("Auth check failed:", err);
        }
        setUser(null); // silently handle 401
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
