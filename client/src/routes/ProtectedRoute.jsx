import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <p>Loading...</p>;

  return user ? children : <Navigate to="/login" />;
};
