import React from "react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/userCredentialSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to="/unauthorize" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
