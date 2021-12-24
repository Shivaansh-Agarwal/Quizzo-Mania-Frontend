import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth-context";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}
