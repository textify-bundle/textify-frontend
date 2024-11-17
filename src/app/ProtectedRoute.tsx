import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./../store";
import { validateToken } from "../store/slices/authSlice";

const ProtectedRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
